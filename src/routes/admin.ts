import express, { Request } from "express";
import path from "path";
import { ROOT_PATH } from "../utils/path";

const router = express.Router();

interface ProductDetails {
  title: string;
  price: number;
  description: string;
}
export const productData: ProductDetails[] = [
  {
    title: "A Great Book",
    price: 19.99,
    description:
      "A very interesting book about so many even more interesting things!",
  },
];

/**
 * Return .ejs rendered using template engine
 */
router.get("/add-product", (req, res) => {
  res.render("add-product", {
    productData,
  });
});

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

router.post("/add-product", (req: Request<{}, any, ProductDetails>, res) => {
  productData.push(req.body);
  res.redirect("/admin/add-product");
});

export default router;
