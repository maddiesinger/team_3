<script>
  import { getLocalStorage } from "../utils.mjs";
  import { deleteFromCart } from "../productDetails.mjs"

  let cartItems = getLocalStorage("so-cart");

  let total = 0;

  if (!cartItems) {
  cartItems = [];
  } else {
  if (Array.isArray(cartItems) && cartItems.length > 0) {
    total = calculateListTotal(cartItems);
  } else {
    cartItems = []; 
  }
}

  function handleDelete(productId) {
  deleteFromCart(productId);
  cartItems = getLocalStorage("so-cart") || []; // Refresh the cart items after deletion
  total = calculateListTotal(cartItems);       // Make sure to recalculate the total after deletion
}


function calculateListTotal(list) {
const totalAmount = list.reduce((sum, item) => sum + (item.FinalPrice * item.quantity), 0);
return totalAmount.toFixed(2);
}

</script>

{#if cartItems.length >0}
<ul class="cart product-list">
  {#each cartItems as item}
    <li class="cart-card divider">
      <a
        href="/product_pages/index.html?productid={item.Id}"
        class="cart-card__image">

        <img src={item.Images.PrimaryMedium} alt={item.Name} />
      </a>
      <a href="../product_pages/index.html?product={item.Id}">
        <h2 class="card__name">{item.Name}</h2>
      </a>
      <p class="cart-card__color">{item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: {item.quantity}</p>
      <p class="cart-card__price">${item.FinalPrice}</p>
      <button on:click={() => handleDelete(item.Id)}>X</button>      </li>
  {/each}
</ul>
<div class="list-footer">
  <p class="list-total"><strong>Subtotal: ${total}</strong></p>
  <a id="checkoutBtn" href="/checkout/">Checkout</a>
</div>
{:else}
<h2>Cart Currently Empty</h2>
{/if}

<a href="/wishlist/">View Wishlist</a>

<style>
#checkoutBtn {
  padding: 0.5em 2em;
  background-color: var(--secondary-color);
  color: white;
  margin: auto;
  width: fit-content;
  display: block;
  border: 0;
  font-size: var(--large-font);
  cursor: pointer;
}
</style>
