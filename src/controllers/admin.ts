import { Request, Response } from "express";
import Product from "../models/product";

/**
 * Get page for admin to add product
 * @param req
 * @param res
 */
export const getAddProduct = (req: Request, res: Response) => {
  Product.fetchAllProducts((products) => {
    res.render("admin/edit-product", {
      editting: false,
      editProduct: null,
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
    null,
    req.body.title,
    req.body.imageUrl,
    req.body.price,
    req.body.description
  );
  product.save();

  // refresh to show latest available products
  res.redirect("/admin/add-product");
};

export const getProducts = (req: Request, res: Response) => {
  Product.fetchAllProducts((products) => {
    res.render("admin/admin-product-listing", {
      productData: products,
      path: req.originalUrl,
    });
  });
};

export const getEditProduct = (
  req: Request<{ productId: string }>,
  res: Response
) => {
  Product.fetchAllProducts((products) => {
    const editProduct = products.find(
      (product) => product.id === req.params.productId
    );
    res.render("admin/edit-product", {
      editting: true,
      product: editProduct,
      productData: products,
      path: req.originalUrl,
    });
  });
};

export const postEditProduct = (
  req: Request<any, any, Product>,
  res: Response
) => {
  const editProduct = new Product(
    req.body.id,
    req.body.title,
    req.body.imageUrl,
    req.body.price,
    req.body.description
  );
  editProduct.save();

  // refresh to show latest available products
  res.redirect(`/admin/edit-product/${req.body.id}`);
};

export const postDeleteProduct = (
  req: Request<any, any, { productId: string }>,
  res: Response
) => {
  Product.delete(req.body.productId);

  // refresh to show latest available products
  res.redirect("/admin/products");
};
