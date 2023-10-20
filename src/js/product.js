import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { renderHeaderFooter } from "./utils.mjs";

const productId = getParam("product");
productDetails(productId, ".product-detail");
renderHeaderFooter();