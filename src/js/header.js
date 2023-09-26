import { getLocalStorage } from "./utils.mjs";

var storedData = getLocalStorage("so-cart");

const superScript = document.querySelector(".cart_superscript");

const getCartCount = () => {
  if (storedData) {
    superScript.style.display = "block"
    if (Array.isArray(storedData)) {
      superScript.innerHTML = storedData.length;
    } else {
      superScript.innerHTML = `${1}`;
    }
  }
};

getCartCount();
