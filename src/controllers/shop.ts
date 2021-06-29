import { Request, Response } from "express";
import Cart from "../models/cart";
import Product from "../models/product";

export const getIndex = (req: Request, res: Response) => {
  Product.fetchAllProducts((products) => {
    res.render("shop/index", {
      productData: products,
      path: req.originalUrl,
    });
  });
};

/**
 * Get page for customer to view products
 * @param req
 * @param res
 */
export const getProducts = (req: Request, res: Response) => {
  Product.fetchAllProducts((products) => {
    res.render("shop/product-listing", {
      productData: products,
      path: req.originalUrl,
    });
  });
};

export const getProduct = async (
  req: Request<{ productId: string }>,
  res: Response
) => {
  const foundProduct = await Product.findOne({
    where: {
      id: req.params.productId,
    },
  });
  res.render("shop/product-detail", {
    product: foundProduct,
    path: "/products",
  });
};

export const getCart = (req: Request, res: Response) => {
  Cart.fetchCart((cart) => {
    res.render("shop/cart", {
      cartProducts: cart.cartProducts,
      totalPrice: cart.totalPrice,
      path: req.originalUrl,
    });
  });
};

export const postCart = (
  req: Request<any, any, { productId: string; price: number }>,
  res: Response
) => {
  const { productId, price } = req.body;
  Cart.addProduct(productId, price);
  res.redirect("/cart");
};

export const postDeleteCartProduct = (
  req: Request<any, any, { productId: string }>,
  res: Response
) => {
  const { productId } = req.body;
  Cart.deleteProduct(productId);
  res.redirect("/cart");
};

export const getCheckout = (req: Request, res: Response) => {
  Product.fetchAllProducts((products) => {
    res.render("shop/checkout", {
      path: req.originalUrl,
    });
  });
};
