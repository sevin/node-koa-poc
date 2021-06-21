import { Request, Response } from "express";
import Product from "../models/product";

export const getAddProduct = (req: Request, res: Response) => {
  res.render("add-product", {
    productData: Product.fetchAllProducts(),
  });
};

export const postAddProduct = (
  req: Request<{}, any, Product>,
  res: Response
) => {
  const product = new Product(
    req.body.title,
    req.body.price,
    req.body.description
  );
  product.save();
  res.redirect("/admin/add-product");
};

export const getProducts = (req: Request, res: Response) => {
  res.render("shop", {
    productData: Product.fetchAllProducts(),
  });
};