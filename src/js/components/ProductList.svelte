<script>
    import { getProductsByCategory } from "../externalServices.mjs";
    export let category;
    let promise = getProductsByCategory(category);
    
    // IDs of tents to filter out
    const excludeTentIds = ["989CG", "880RT"];

    // Function to filter tents
    const filterTents = (products) => { 
        return products.filter(product => !excludeTentIds.includes(product.Id));
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
                    <img src={product.Images.PrimaryLarge} alt="Image of {product.Name}" />
                    <h3 class="card__brand">{product.Brand.Name}</h3>
                    <h2 class="card__name">{product.NameWithoutBrand}</h2>
                    <p class="product-card__price">${product.SuggestedRetailPrice}</p>
                    <p class="product-card__final-price"><b>${product.FinalPrice}</b></p>
                </a>
            </li>
        {/each}
    </ul>
{/await}
