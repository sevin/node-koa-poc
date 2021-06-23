import express, { Request } from "express";
import {
  getAddProduct,
  getEditProduct,
  getProducts,
  postAddProduct,
  postDeleteProduct,
  postEditProduct,
} from "../controllers/admin";

const router = express.Router();

/**
 * Return .ejs rendered using template engine
 */
router.get("/add-product", getAddProduct);

/**
 * Return .html defined as a file somewhere else
 */
// router.get("/add-product", (req, res) => {
//   res.sendFile(path.join(ROOT_PATH, "views", "add-product.html"));
// });

/**
 * Return HTML as it is
 */
// const POST_PRODUCT_PATH = "/admin/add-product";
// router.get("/add-product", (req, res) => {
//   res.send(
//     `<html>
//       <form action="${POST_PRODUCT_PATH}" method="POST">
//         Product Name: <input name="productName" />
//         <button type="submit">Add Product</button>
//       </form>
//     </html>`
//   );
// });

router.get("/products", getProducts);
router.post("/add-product", postAddProduct);
router.get("/edit-product/:productId", getEditProduct);
router.post("/edit-product", postEditProduct);
router.post("/delete-product", postDeleteProduct);

export default router;
