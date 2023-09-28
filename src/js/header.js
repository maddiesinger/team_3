import { getLocalStorage } from "./utils.mjs";

const addSuperScript = () => {
  var storedData = getLocalStorage("so-cart");
  const superScript = document.querySelector(".cart_superscript");

  if (storedData) {
    superScript.style.display = "block";
    if (Array.isArray(storedData)) {
      superScript.innerHTML = storedData.length;
    } else {
      superScript.innerHTML = `${1}`;
    }
  }
};

addSuperScript();

export { addSuperScript };
