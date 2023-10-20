import ProductList from "./components/ProductList.svelte";
import { renderHeaderFooter, getParam } from "./utils.mjs";

renderHeaderFooter()

const category = getParam("category");
new ProductList({
    target: document.querySelector(".products"),
    props: { category: category },
  });