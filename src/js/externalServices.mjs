const baseURL = import.meta.env.VITE_SERVER_URL;

export async function convertToJson(jsonResponse) {
  if (jsonResponse.ok) {
    return jsonResponse.json();
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}
export async function findRandomProduct() {
    const categories = ["tents", "sleeping-bags", "hammocks", "backpacks"];
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);
    const category = categories[randomCategoryIndex];
    const productData = await getProductsByCategory(category)    
    const productIds = productData.map(product => product.Id);
    const randomIndex = Math.floor(Math.random() * productIds.length);
    const randomProductId = productIds[randomIndex];
    const randomProduct = await findProductById(randomProductId)
    return randomProduct;
  
}
export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}