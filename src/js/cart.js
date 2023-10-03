import { getLocalStorage } from "./utils.mjs";
import { addSuperScript } from "./header";
import { showNotification } from "./productDetails.mjs";

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

  if (Array.isArray(cartItems) && cartItems.length != 0) {

    let el = document.querySelector(".cart-footer");
    let cartTotal = 0;
    // Check if cartItems is an array
    cartItems.map((item) => (cartTotal += item.FinalPrice));
    el.innerHTML = `Total: $${cartTotal}`;
    if (el.classList.contains("hide")) {
      el.classList.remove("hide");
      el.classList.add("visible");
    }
    
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
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".deleteFromCart");
  deleteButtons.forEach(button => {
    button.addEventListener("click", function(event) {
      // prevents the default event from occuring when the delete button is clicked
      event.preventDefault();
      const itemId = event.target.getAttribute("data-id");
      const itemName = event.target.getAttribute("name-id")
      deleteItemFromCart(itemId);
      showNotification(`Item: ${itemName} has been deleted from your cart`);
      renderCartContents();
      // updates the cart superscript icon value after items have been removed
      addSuperScript()
    });
  });
}

// Function to update the local storage and delete the item IDs
function deleteItemFromCart(itemId) {

  // This filters out the item with the given ID, deleting it from the cart
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems = cartItems.filter(item => item.Id !== itemId);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
}

renderCartContents();
