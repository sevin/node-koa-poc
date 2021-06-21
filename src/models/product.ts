import fs from "fs";
import path from "path";
import { ROOT_PATH } from "../utils/path";

const PRODUCT_FILE_PATH = path.join(ROOT_PATH, "..", "data", "products.json");

interface IProduct {
  title: string;
  price: number;
  description: string;

  save: () => void;
}

class Product implements IProduct {
  title: string;
  price: number;
  description: string;

  constructor(title: string, price: number, description: string) {
    this.title = title;
    this.price = price;
    this.description = description;
  }

  save(): void {
    fetchAllProductsFromFile((products) => {
      const newProducts = [...products, this];
      fs.writeFile(PRODUCT_FILE_PATH, JSON.stringify(newProducts), () => {});
    });
  }

  static fetchAllProducts(callback: (products: Product[]) => void) {
    fetchAllProductsFromFile(callback);
  }
}

const fetchAllProductsFromFile = (callback: (products: Product[]) => void) => {
  fs.readFile(PRODUCT_FILE_PATH, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent.toString()));
    }
  });
};

export default Product;
