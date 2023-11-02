<script>
    import { getLocalStorage } from "../utils.mjs";
    const cartItems = getLocalStorage("so-cart");
    let total = calculateListTotal(cartItems);

    function calculateListTotal(list) {
      const amounts = list.map((item) => item.FinalPrice);
      return amounts.reduce((sum, item) => sum + item, 0);
    }
  </script>
  
  {#if cartItems.length >0}
  <ul class="product-list">
    {#each cartItems as item}
      <li class="cart-card divider">
        <a
          href="/product_pages/index.html?productid={item.Id}"
          class="cart-card__image">

          <img src={item.Images.PrimaryMedium} alt={item.Name} />
        </a>
        <a href="../product_pades/index.html?productid={item.Id}">
          <h2 class="card__name">{item.Name}</h2>
        </a>
        <p class="cart-card__color">{item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">${item.FinalPrice}</p>
      </li>
    {/each}
  </ul>
  <div class="list-footer">
    <p class="list-total"><strong>Subtotal: ${total}</strong></p>
    <a id="checkoutBtn" href="/checkout/">Checkout</a>
  </div>
  {:else}
  <h2>Cart Currently Empty</h2>
  {/if}

<style>
  #checkoutBtn {
  padding: 0.5em 2em;
  background-color: var(--secondary-color);
  color: white;
  margin:auto;
  width: fit-content;
  display: block;
  border: 0;
  font-size: var(--large-font);
  cursor: pointer;
}
</style>

  