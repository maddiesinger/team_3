import ShoppingCart from "./components/ShoppingCart.svelte"; 
import { getLocalStorage } from "./utils.mjs";
import { showNotification } from "./productDetails.mjs";
import { renderHeaderFooter } from "./utils.mjs";
import { cartCount } from "./stores.mjs";


new ShoppingCart({
  target: document.querySelector(".products"),
});

renderHeaderFooter();