import express, { Request } from "express";
import { getAddProduct, postAddProduct } from "../controllers/products";

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

router.post("/add-product", postAddProduct);

export default router;
