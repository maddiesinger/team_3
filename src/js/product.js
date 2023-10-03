import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId, ".product-detail");

// // Add animation when button is clicked
// document.getElementById("addToCart").addEventListener("click", function() {
//     // Toggle the 'animated' class on the backpack
//       const backpack = document.getElementById("backpackIcon");
//       backpack.classList.toggle("animated");
      
//       // Return to the normal size after a time delay
//       setTimeout(function() {
//         backpack.classList.toggle("return-to-normal");
//       }, 500);
    
//     });