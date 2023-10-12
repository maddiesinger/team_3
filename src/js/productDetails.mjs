import { getLocalStorage, setLocalStorage} from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { addSuperScript } from "./header";

let product = {};

export default async function productDetails(productId, selector) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  checkProduct(product, selector)
  
  // once the HTML is rendered we can add a listener to Add to Cart button
  
}

// error handler 
function checkProduct(product, selector){
  try{
    const el = document.querySelector(selector);
    el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
    document.getElementById("addToCart").addEventListener("click", addToCartHandler);
  }
  catch(error){
    const el = document.querySelector(selector);
    console.log(error.message)
    el.insertAdjacentHTML("afterBegin", 
    `
    <h1>There are no products here.</h1>
    <p>Check out more products <a href="../index.html">here</a>.</p>
    `
    )
  }
}

// eslint-disable-next-line no-shadow
function productDetailsTemplate(product) {
  return `
  <h3>${product.Brand.Name}</h3>
  <h2 class="divider">${product.NameWithoutBrand}</h2>
  <img
    class="divider"
    src="${product.Image}"
    alt="${product.Name}"
  />
  <p class="product-card__price">$${product.SuggestedRetailPrice}</p>
  <p class="product-card__final-price"><b>$${product.FinalPrice}</b></p>
  <p class="product__color">${product.Colors[0].ColorName}</p>
  <p class="product__description">
  ${product.DescriptionHtmlSimple}
  </p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
  </div>`;
}


export function showNotification(message) {
    const notification = document.createElement("div");
    notification.innerText = message;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.padding = "10px";
    notification.style.backgroundColor = "#333";
    notification.style.color = "#fff";
    notification.style.borderRadius = "5px";
    notification.style.opacity = "0.9";
    document.body.appendChild(notification);
  
    setTimeout(() => {
      notification.remove();
    }, 2000); // Remove the meaasge after 2 seconds.
  }


  function addProductToCart() {
    // Get current cart items or default to an empty array if null.
    const cartItems = getLocalStorage("so-cart") || [];
  
    // this is a check to indeed make sure the items are not objects.
    if (!Array.isArray(cartItems)) {
      // eslint-disable-next-line no-console
      console.log("Expected cartItems to be an array, but got:", cartItems);
      return;
    }
  
    // Check if the product is already in the cart.
    const existingProduct = cartItems.find(item => item.Id === product.Id);
  
    if (existingProduct) {
      // If the product is already in the cart, the quantity will be increased, will be useful in the future.
      existingProduct.quantity += 1;
    } else {
      // If the product is not in the cart, add it to the array.
      cartItems.push(product);
    }
    showNotification("Item has been added to the cart!");  // Save the updated cart items back to local storage.
    setLocalStorage("so-cart", cartItems);
    addSuperScript()
  }
  
// Add to cart button event handler.
async function addToCartHandler(e) {
    const productItem = await findProductById(e.target.dataset.id);
    addProductToCart(productItem)
  }
  
