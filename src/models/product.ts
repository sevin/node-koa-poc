import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import { PRODUCTS_FILE_PATH } from "../utils/path";
interface IProduct {
  title: string;
  price: number;
  description: string;

  save: () => void;
}

class Product implements IProduct {
  id: string | null;
  title: string;
  price: number;
  description: string;

  constructor(
    id: string | null,
    title: string,
    price: number,
    description: string
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
  }

  save(): void {
    fetchAllProductsFromFile((products) => {
      if (this.id) {
        // there's id, hence it's an update
        const editProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        products.splice(editProductIndex, 1, this);
      } else {
        // else generate random id and add to product list
        this.id = uuidv4();
        products.push(this);
      }

      saveAllProductsToFile(products);
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

const saveAllProductsToFile = (products: Product[]) => {
  fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products), () => {});
};

export default Product;
