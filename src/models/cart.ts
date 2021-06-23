import fs from "fs";
import { CART_FILE_PATH } from "../utils/path";

interface CartProduct {
  id: string;
  price: number;
  quantity: number;
}

interface Cart {
  cartProducts: CartProduct[];
  totalPrice: number;
}

const fetchCartFromFile = (callback: (cart: Cart) => void) => {
  fs.readFile(CART_FILE_PATH, (err, fileContent) => {
    if (!err) {
      callback(JSON.parse(fileContent.toString()));
    } else {
      callback({
        cartProducts: [],
        totalPrice: 0,
      });
    }
  });
};

const writeCartToFile = (cart: Cart) => {
  fs.writeFile(CART_FILE_PATH, JSON.stringify(cart), () => {});
};

class Cart {
  static addProduct(productId: string, price: number): void {
    fetchCartFromFile((cart) => {
      const newTotalPrice = cart.totalPrice + +price;
      const newCartProducts = [...cart.cartProducts];

      const existingCartProductIndex = cart.cartProducts.findIndex(
        (cartProduct) => cartProduct.id === productId
      );
      if (existingCartProductIndex === -1) {
        newCartProducts.push({ id: productId, price: +price, quantity: 1 });
      } else {
        newCartProducts[existingCartProductIndex].quantity =
          newCartProducts[existingCartProductIndex].quantity + 1;
      }

      writeCartToFile({
        cartProducts: newCartProducts,
        totalPrice: newTotalPrice,
      });
    });
  }

  static decreaseProductQuantity(productId: string): void {
    fetchCartFromFile((cart) => {
      let newTotalPrice = cart.totalPrice;
      const newCartProducts = [...cart.cartProducts];

      const existingCartProductIndex = cart.cartProducts.findIndex(
        (cartProduct) => cartProduct.id === productId
      );
      if (existingCartProductIndex === -1) {
        throw new Error("Product does not exist in cart, hence cannot remove.");
      } else {
        const existingCartProduct = cart.cartProducts[existingCartProductIndex];

        newTotalPrice -= existingCartProduct.price;

        if (existingCartProduct.quantity > 1) {
          newCartProducts[existingCartProductIndex].quantity =
            existingCartProduct.quantity - 1;
        } else {
          newCartProducts.splice(existingCartProductIndex, 1);
        }
      }

      writeCartToFile({
        cartProducts: newCartProducts,
        totalPrice: newTotalPrice,
      });
    });
  }

  static deleteProduct(productId: string): void {
    fetchCartFromFile((cart) => {
      let newTotalPrice = cart.totalPrice;
      const newCartProducts = [...cart.cartProducts];

      const existingCartProductIndex = cart.cartProducts.findIndex(
        (cartProduct) => cartProduct.id === productId
      );
      if (existingCartProductIndex === -1) {
        // do nothing or throw error
        // throw new Error("Product does not exist in cart, hence cannot remove.");
      } else {
        const cartProduct = cart.cartProducts[existingCartProductIndex];
        newTotalPrice -= cartProduct.quantity * cartProduct.price;
        newCartProducts.splice(existingCartProductIndex, 1);
      }

      writeCartToFile({
        cartProducts: newCartProducts,
        totalPrice: newTotalPrice,
      });
    });
  }

  static fetchCart(callback: (cart: Cart) => void): void {
    fetchCartFromFile(callback);
  }
}

export default Cart;
