import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { renderHeaderFooter } from "./utils.mjs";

const productId = getParam("product");
productDetails(productId, ".product-detail");
renderHeaderFooter();

document.addEventListener("DOMContentLoaded", function() {
    // Load comments from localStorage if available
    const comments = JSON.parse(localStorage.getItem("productComments")) || [];
  
    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");
    const commentList = document.getElementById("commentList");
  
    // Display existing comments
    renderComments(comments);
  
    // Add new comment
    commentForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const newComment = commentInput.value.trim();
      if (newComment) {
        comments.push(newComment);
        localStorage.setItem("productComments", JSON.stringify(comments));
        renderComments(comments);
        commentInput.value = "";
      }
    });
  
    // Display comments in the list
    function renderComments(comments) {
      commentList.innerHTML = comments.map(comment => `<li>${comment}</li>`).join("");
    }
});