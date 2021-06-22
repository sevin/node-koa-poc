import { Request, Response } from "express";
import Product from "../models/product";

/**
 * Get page for admin to add product
 * @param req
 * @param res
 */

export const getAddProduct = (req: Request, res: Response) => {
  Product.fetchAllProducts((products) => {
    res.render("admin/add-product", {
      productData: products,
      path: req.originalUrl,
    });
  });
};
/**
 * API to add a product to storage
 * @param req
 * @param res
 */

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

export const getEditProduct = (req: Request, res: Response) => {
  res.render("admin/edit-product", {
    path: req.originalUrl,
  });
};
