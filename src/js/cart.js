import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; // Default to an empty array if null

  if (Array.isArray(cartItems)) {
    // Check if cartItems is an array
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    calculateCartTotal(cartItems);
  } else {
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

renderCartContents();
