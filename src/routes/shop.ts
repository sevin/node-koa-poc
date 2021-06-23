import express from "express";
import {
  getCart,
  getCheckout,
  getIndex,
  getProduct,
  getProducts,
  postCart,
  postDeleteCartProduct,
} from "../controllers/shop";

const router = express.Router();

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/products/:productId", getProduct);
router.get("/cart", getCart);
router.post("/cart", postCart);
router.post("/cart-delete-product", postDeleteCartProduct);
router.get("/checkout", getCheckout);

export default router;
