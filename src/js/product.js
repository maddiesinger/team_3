import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

// a message meant pop up if the add buttons work.
function showNotification(message) {
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

function addProductToCart(product) {
  // Get current cart items or default to an empty array if null.
  const cartItems = getLocalStorage("so-cart") || [];

  // this is a check to indeed make sure the items are not objects.
  if (!Array.isArray(cartItems)) {
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
}

// Add to cart button event handler.
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Add listener to Add to Cart button.
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

// Add animation when button is clicked
document.getElementById("addToCart").addEventListener("click", function() {
// Toggle the 'animated' class on the backpack
  const backpack = document.getElementById("backpackIcon");
  backpack.classList.toggle("animated");
  
  // Return to the normal size after a time delay
  setTimeout(function() {
    backpack.classList.toggle("return-to-normal");
  }, 500);

});

const productId = getParam("product");
productDetails(productId, ".product-detail");
