import express from "express";
import { productData } from "./admin";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("shop", {
    productData,
  });
});

export default router;
