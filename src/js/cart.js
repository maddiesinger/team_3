import { getLocalStorage } from "./utils.mjs";
import { showNotification } from "./productDetails.mjs";
import { renderHeaderFooter } from "./utils.mjs";
import { cartCount } from "./stores.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; // Default to an empty array if null
  if (Array.isArray(cartItems)) {
    // Check if cartItems is an array
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    setupDeleteButtons(); // listens for the x delete button to be hit to trigger deleting the item from the cart
    calculateCartTotal(cartItems);
  } else {
    // eslint-disable-next-line no-console
    console.log("Expected cartItems to be an array, but got:", cartItems);
  }
}

function calculateCartTotal(cartItems) {
  let el = document.querySelector(".cart-footer");
  
  if (Array.isArray(cartItems) && cartItems.length != 0) {
    let cartTotal = 0;
    cartItems.map((item) => (cartTotal += item.FinalPrice * item.quantity));  // updated to make sure it multiplies each item
    el.innerHTML = `Total: $${cartTotal}`;
    if (el.classList.contains("hide")) {
      el.classList.remove("hide");
      el.classList.add("visible");
    }
  } else {
    if (el.classList.contains("visible")) {
      el.classList.remove("visible");
      el.classList.add("hide");
    }
    el.innerHTML = "";
  }
}



function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <button class="deleteFromCart" data-id="${item.Id}" name-id="${item.Name}" >X</button>
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">quantity: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".deleteFromCart");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      // prevents the default event from occuring when the delete button is clicked
      event.preventDefault();
      const itemId = event.target.getAttribute("data-id");
      const itemName = event.target.getAttribute("name-id");
      deleteItemFromCart(itemId);
      showNotification(`Item: ${itemName} has been deleted from your cart`);
      renderCartContents();
    });
  });
}

function deleteItemFromCart(itemId) {
  // This filters out the item with the given ID, deleting it from the cart
  let cartItems = getLocalStorage("so-cart") || [];

  // Find the item that needs to be updated
  const itemIndex = cartItems.findIndex(item => item.Id === itemId);

  if(itemIndex > -1) {
    // Reduce the quantity by 1
    cartItems[itemIndex].quantity -= 1;

    // Check if the quantity is 0 or less and remove it if thats the case
    if(cartItems[itemIndex].quantity <= 0) {
      cartItems.splice(itemIndex, 1);
    }
  }

  // Make sure to udate the local storage
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
}

renderCartContents();
renderHeaderFooter();