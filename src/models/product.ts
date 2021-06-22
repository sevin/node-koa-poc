import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import { PRODUCTS_FILE_PATH } from "../utils/path";
interface IProduct {
  title: string;
  price: number;
  description: string;

  save: () => void;
  edit: (newProductDetails: Product) => void;
}

class Product implements IProduct {
  id: string;
  title: string;
  price: number;
  description: string;

  constructor(title: string, price: number, description: string) {
    this.id = uuidv4();
    this.title = title;
    this.price = price;
    this.description = description;
  }

  save(): void {
    fetchAllProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products), () => {});
    });
  }

  edit(newProductDetails: Product) {
    fetchAllProductsFromFile((products) => {
      const editProductIndex = products.findIndex(
        (product) => product.id === newProductDetails.id
      );
      products.splice(editProductIndex, 1, newProductDetails);
      fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products), () => {});
    });
  }

  static fetchAllProducts(callback: (products: Product[]) => void) {
    fetchAllProductsFromFile(callback);
  }

  static findById(
    id: string,
    callback: (product: Product | undefined) => void
  ) {
    fetchAllProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }
}

const fetchAllProductsFromFile = (callback: (products: Product[]) => void) => {
  fs.readFile(PRODUCTS_FILE_PATH, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent.toString()));
    }
  });
};

export default Product;
