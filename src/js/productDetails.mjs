import { getLocalStorage, setLocalStorage, alertMessage} from "./utils.mjs";
import { findProductById, findRandomProduct} from "./externalServices.mjs";
import { cartCount } from "./stores.mjs";


let product = {};
let carousel;
let slides;
let currentIndex = 0;


export default async function productDetails(productId, selector) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  
  // once we have the product details we can render out the HTML
  checkProduct(product, selector)
  const breadcrumb = document.querySelector(".breadcrumb")
  breadcrumb.innerHTML += `<a href="/product-list/index.html?category=${product.Category}">${product.Category}</a>`

  const randomProduct1 =  await findRandomProduct()
  const randomProduct2 =  await findRandomProduct()
  const recommended = document.querySelector(".recommended");
  recommended.innerHTML += recommendedTemplate(randomProduct1);
  recommended.innerHTML += recommendedTemplate(randomProduct2);
  
}

// error handler 
// eslint-disable-next-line no-shadow
function checkProduct(product, selector){
  try{
    const el = document.querySelector(selector);
    el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
    document.getElementById("addToCart").addEventListener("click", addToCartHandler);

    if (product.Images.ExtraImages && product.Images.ExtraImages.length > 0) {
    carousel = document.querySelector(".carousel");
    slides = document.querySelectorAll(".carousel-slide");
    const prevButton = document.getElementById("prevBtn");
    const nextButton = document.getElementById("nextBtn");
    

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });
  
    updateCarousel();

  }
  
  }
  catch(error){
    const el = document.querySelector(selector);
    // eslint-disable-next-line no-console
    console.log(error.message)
    el.insertAdjacentHTML("afterBegin", 
    `
    <h1>There are no products here.</h1>
    <p>Check out more products <a href="../index.html">here</a>.</p>
    `
    )
  }
}


function updateCarousel() {
  const slideWidth = slides[currentIndex].getBoundingClientRect().width;
  carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

}

// eslint-disable-next-line no-shadow
function productDetailsTemplate(product) {
  let imageHTML; // Initialize an empty string to store image HTML

  if (product.Images.ExtraImages && product.Images.ExtraImages.length > 0) {
    // If there are ExtraImages, create a carousel
    imageHTML = `
    <div class="carousel-container">
    <div class="carousel">
    <div class="carousel-slide"><img class="active" src="${product.Images.PrimaryLarge}" alt="${product.Name}" /></div>
    ${product.Images.ExtraImages.map((extraImage) => `
      <div class="carousel-slide"><img class="carousel-image" src="${extraImage.Src}" alt="${extraImage.Title}" /></div>
    `).join("")}
    </div>

    <button id="prevBtn" class="carousel-button">&#8249;</button>
    <button id="nextBtn" class="carousel-button">&#8250</button>
    </div>
    `;
  } else {
    // If there are no ExtraImages, use the primary image
    imageHTML = `
      <img
        class="single-image"
        src="${product.Images.PrimaryLarge}"
        alt="${product.Name}"
      />
    `;
  }

  return `
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    ${imageHTML}
    <p class="product-card__price">$${product.SuggestedRetailPrice}</p>
    <p class="product-card__final-price"><b>$${product.FinalPrice}</b></p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  `;
}
function recommendedTemplate(recommended_product) {
  return `
  <li class="product-card">
  <a href="/product_pages/index.html?product=${recommended_product.Id}">
      <img src=${recommended_product.Images.PrimaryLarge} alt="Image of ${recommended_product.Name}" />
      <h3 class="card__brand">${recommended_product.Brand.Name}</h3>
      <h2 class="card__name">${recommended_product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${recommended_product.SuggestedRetailPrice}</p>
      <p class="product-card__final-price"><b>$${recommended_product.FinalPrice}</b></p>
  </a>
</li>`;
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


function addProductToCart(productItem) {
  // Get current cart items or default to an empty array if null.
  const cartItems = getLocalStorage("so-cart") || [];

  // this is a check to indeed make sure the items are not objects.
  if (!Array.isArray(cartItems)) {
    // eslint-disable-next-line no-console
    console.log("Expected cartItems to be an array, but got:", cartItems);
    return;
  }

  // Check if the product is already in the cart.
  let existingProduct = cartItems.find(item => item.Id === productItem.Id)

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    // If the product is not in the cart, assign an initial quantity and add it.
    productItem.quantity = 1;  // Ensure the product has a quantity property set.
    cartItems.push(productItem);
  }
  showNotification(`${productItem.Name} has been added to the cart!`);  // Save the updated cart items back to local storage.
  setLocalStorage("so-cart", cartItems);
  // Calculate the total quantity of all items in the cart, same as in cart.js
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Set the cart count to the total quantity of all items.
  cartCount.set(totalQuantity);
}

export async function deleteFromCart(productItemId) {
  const cartItems = getLocalStorage("so-cart") || [];

  // Find the item in the cart
  const item = cartItems.find(i => i.Id === productItemId);
  if (item) {
    item.quantity -= 1;

    // If the item's quantity reaches zero, remove it from the cart.
    if (item.quantity === 0) {
      const index = cartItems.indexOf(item);
      cartItems.splice(index, 1);
    }
  }

  setLocalStorage("so-cart", cartItems);
  const totalQuantity = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  cartCount.set(totalQuantity);

  if (item && item.quantity > 0) {
    showNotification(`Item has been deleted from the cart.`);
  } else {
    showNotification(`Item has been deleted from the cart.`);
  }
}


  
async function addToCartHandler(e) {
  const productItem = await findProductById(e.target.dataset.id);
  addProductToCart(productItem);
  const backpack = document.getElementById("backpackIcon");
  // Add the "animated" class to the backpack, it seems thats toggle led to the animation not working every other click.
  //it still is a little funky when you cikc on it multiple times but this should work for now.
  backpack.classList.add("animated");
  // Remove the "animated" class and add "return-to-normal" after a time delay
  setTimeout(() => {
    backpack.classList.remove("animated");
    backpack.classList.add("return-to-normal");
    //Remove "return-to-normal" class after its animation is complete
    setTimeout(() => {
      backpack.classList.remove("return-to-normal");
    }, 500);  // left the original timeout time
    
  }, 500);
}