import path from "path";

// this will return folder path of where app.js is located because the node project is run with "node ./build/app.js"
export const ROOT_PATH = path.dirname(require.main?.filename || "");

export const PRODUCTS_FILE_PATH = path.join(
  ROOT_PATH,
  "..",
  "data",
  "products.json"
);
export const CART_FILE_PATH = path.join(ROOT_PATH, "..", "data", "cart.json");
