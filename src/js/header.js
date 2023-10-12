import { getLocalStorage } from "./utils.mjs";

const addSuperScript = () => {
  var storedData = getLocalStorage("so-cart");
  const superScript = document.querySelector(".cart_superscript");

  if (storedData) {
    superScript.style.display = "block";
    if (Array.isArray(storedData)) {
      const totalQuantity = storedData.reduce((total, product) => total + product.quantity, 0);
      superScript.innerHTML = totalQuantity;
    } else {
      superScript.innerHTML = `${1}`;
    }
  }
};


addSuperScript();

export { addSuperScript };
