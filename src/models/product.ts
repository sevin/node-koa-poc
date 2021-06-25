import { RowDataPacket } from "mysql2";
import { db } from "../utils/database";

import Cart from "./cart";
interface IProduct {
  id: string | null;
  title: string;
  imageUrl: string;
  price: number;
  description: string;

  save: () => void;
}

class Product implements IProduct {
  id: string | null;
  title: string;
  imageUrl: string;
  price: number;
  description: string;

  constructor(
    id: string | null,
    title: string,
    imageUrl: string,
    price: number,
    description: string
  ) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save(): void {
    if (this.id) {
      // there's id, hence it's an update
      db.execute(
        "UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?",
        [this.title, this.price, this.description, this.imageUrl, this.id]
      );
    } else {
      db.execute("INSERT INTO products VALUES (?,?,?,?,?)", [
        null,
        this.title,
        this.price,
        this.description,
        this.imageUrl,
      ]);
    }
  }

  static delete(productId: string): void {
    db.execute("DELETE FROM products WHERE id = ?", [productId]);
    Cart.deleteProduct(productId);
  }

  static fetchAllProducts(callback: (products: Product[]) => void) {
    db.execute("SELECT * FROM products").then((queryResults) => {
      callback(queryResults[0] as Product[]);
    });
  }

  static findById(
    id: string,
    callback: (product: Product | undefined) => void
  ) {
    db.execute<RowDataPacket[]>("SELECT * FROM products WHERE id = ?", [
      id,
    ]).then(([rows]) => callback(rows[0] as Product));
  }
}

// const fetchAllProductsFromFile = async (
//   callback: (products: Product[]) => void
// ) => {
//   fs.readFile(PRODUCTS_FILE_PATH, (err, fileContent) => {
//     if (err) {
//       callback([]);
//     } else {
//       callback(JSON.parse(fileContent.toString()));
//     }
//   });
// };

// const saveAllProductsToFile = (products: Product[]) => {
//   fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products), () => {});
// };

export default Product;
