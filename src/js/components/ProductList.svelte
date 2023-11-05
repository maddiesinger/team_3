<script>
  import { getProductsByCategory } from "../externalServices.mjs";
  export let category;
  let promise = getProductsByCategory(category);
  const excludeTentIds = ["989CG", "880RT"];
  let selectedProduct = null; // This variable will hold the data for the product that is being viewed in the modal

  const filterTents = (products) => {
    return products.filter((product) => !excludeTentIds.includes(product.Id));
  };

  const showProductDetails = (product) => {
    selectedProduct = product;
  };

  const closeModal = () => {
    selectedProduct = null;
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };
</script>

<h2>Top Products: {category}</h2>
{#await promise}
  Loading
{:then products}
  <ul class="product-list">
    {#each filterTents(products) as product}
      <li class="product-card">
        <a href="/product_pages/index.html?product={product.Id}">
          <img
            src={product.Images.PrimaryLarge}
            alt="Image of {product.Name}"
          />
          <h3 class="card__brand">{product.Brand.Name}</h3>
          <h2 class="card__name">{product.NameWithoutBrand}</h2>
          <p class="product-card__price">${product.SuggestedRetailPrice}</p>
          <p class="product-card__final-price"><b>${product.FinalPrice}</b></p>
        </a>
        <button on:click={() => showProductDetails(product)}
          >Quick Lookup</button
        >
      </li>
    {/each}
  </ul>
  {#if selectedProduct}
    <div class="productmodal" on:click={closeModal}>
      <div class="productmodal-content" on:click={stopPropagation}>
        <span class="productmodal-close" on:click={closeModal}>&times;</span>
        <h1>{selectedProduct.Brand.Name}</h1>
        <h1>{selectedProduct.NameWithoutBrand}</h1>
        <img
          src={selectedProduct.Images.PrimaryLarge}
          alt="Image of {selectedProduct.Name}"
        />
        <!-- Add other product details as needed -->
      </div>
    </div>
  {/if}
{/await}
