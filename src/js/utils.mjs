import MainFooter from "./components/MainFooter.svelte";
import MainHeader from "./components/MainHeader.svelte";
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getCartCount(){
  var storedData = getLocalStorage("so-cart");
  if (storedData) {
    if (Array.isArray(storedData)) {
      const totalQuantity = storedData.reduce((total, product) => total + product.quantity, 0);
      return totalQuantity;
    } else {
      return 1;
    }
  }
  else {
    return;
  }
};

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderHeaderFooter(){
  new MainHeader({
    target: document.querySelector("#main-header"),
    props: { cartCount: getCartCount() },
  });
  new MainFooter({
    target: document.querySelector("#main-footer"),
  });
}

export function displayBanner(){
  let visited = false;
  let banner = document.querySelector(".first-banner");
  if(localStorage.getItem("was-visited")){
    banner.classList.remove("first-banner");
    banner.classList.add("banner");
    return;
  }
  else{
    visited = true;
    localStorage.setItem("was-visited", 1);
  }
  
}

export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}