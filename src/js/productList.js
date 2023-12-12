import ProductList from "./components/ProductList.svelte";
import { renderHeaderFooter, getParam } from "./utils.mjs";
import { getData } from "./productData.mjs";

renderHeaderFooter()

const category = getParam("category");

new ProductList({
    target: document.querySelector(".products"),
    props: { category: category },
  });


const breadcrumb = document.querySelector(".breadcrumb")

let products;

getData(category)
  .then(data => {
    // Assuming `data` is an array
    products = data;
    const count = products.length;
    breadcrumb.innerHTML += `<a href="/product-list/index.html?category=${category}">${category}</a>/<a>(${count} items)</a>`
  });