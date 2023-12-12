import { renderHeaderFooter } from "./utils.mjs";
// wishlist.js

import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById, showNotification, addProductToCart } from "./productDetails.mjs";

document.addEventListener("DOMContentLoaded", () => {
  renderWishlist();

  const wishlistContainer = document.querySelector(".wishlist");

  wishlistContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("wishlist-move-to-cart")) {
      const productId = event.target.dataset.id;
      await moveItemToCart(productId);
      renderWishlist(); // Update the wishlist display after moving an item to the cart
    }
  });

  // Add event listener to the "Back to Cart" button
  const backToCartButton = document.getElementById("backToCartButton");
  if (backToCartButton) {
    backToCartButton.addEventListener("click", function () {
      // Navigate back to the cart page
      window.location.href = "/cart/index.html";
    });
  }
});

function renderWishlist() {
  const wishlistItems = getLocalStorage("so-wishlist") || [];
  const wishlistContainer = document.querySelector(".wishlist");

  wishlistContainer.innerHTML = ""; // Clear existing content

  wishlistItems.forEach(async (item) => {
    const product = await findProductById(item.Id);
    wishlistContainer.innerHTML += wishlistTemplate(product);
  });

  // Add "Back to Cart" button after rendering wishlist items
  wishlistContainer.innerHTML += `<button id="backToCartButton">Back to Cart</button>`;
}

function wishlistTemplate(product) {
  let imageHTML;

  if (product.Images.ExtraImages && product.Images.ExtraImages.length > 0) {
    imageHTML = `
      <div class="carousel-container">
        <div class="carousel">
          <div class="carousel-slide"><img class="active" src="${product.Images.PrimaryLarge}" alt="${product.Name}" /></div>
          ${product.Images.ExtraImages.map(extraImage => `
            <div class="carousel-slide"><img class="carousel-image" src="${extraImage.Src}" alt="${extraImage.Title}" /></div>
          `).join("")}
        </div>

        <button class="carousel-button" disabled>&#8249;</button>
        <button class="carousel-button" disabled>&#8250</button>
      </div>
    `;
  } else {
    imageHTML = `
      <img class="single-image" src="${product.Images.PrimaryLarge}" alt="${product.Name}" />
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
    <div class="wishlist-detail__actions">
      <button class="wishlist-move-to-cart" data-id="${product.Id}">Move to Cart</button>
    </div>
  `;
}

async function moveItemToCart(productId) {
  const wishlistItems = getLocalStorage("so-wishlist") || [];
  const updatedWishlist = wishlistItems.filter(item => item.Id !== productId);
  setLocalStorage("so-wishlist", updatedWishlist);

  const productItem = await findProductById(productId);
  addProductToCart(productItem);

  showNotification(`${productItem.Name} has been moved to the cart.`);
}