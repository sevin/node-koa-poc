import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/database";

import Cart from "./cart";
interface IProduct {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
}

interface IProductCreation extends Optional<IProduct, "id"> {}

class Product extends Model<IProduct, IProductCreation> implements IProduct {
  public id!: string;
  public title!: string;
  public imageUrl!: string;
  public price!: number;
  public description!: string;

  // save(): void {
  //   if (this.id) {
  //     // there's id, hence it's an update
  //     db.execute(
  //       "UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?",
  //       [this.title, this.price, this.description, this.imageUrl, this.id]
  //     );
  //   } else {
  //     db.execute("INSERT INTO products VALUES (?,?,?,?,?)", [
  //       null,
  //       this.title,
  //       this.price,
  //       this.description,
  //       this.imageUrl,
  //     ]);
  //   }
  // }

  static delete(productId: string): void {
    // db.execute("DELETE FROM products WHERE id = ?", [productId]);
    Product.destroy({
      where: {
        id: productId,
      },
    });
    Cart.deleteProduct(productId);
  }

  static async fetchAllProducts(callback: (products: Product[]) => void) {
    const allProducts = await Product.findAll();

    callback(allProducts);
  }

  static async findById(
    id: string,
    callback: (product: Product | null) => void
  ) {
    const foundProduct = await Product.findOne({
      where: {
        id: id,
      },
    });
    callback(foundProduct);
  }
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: sequelize }
);

/**
 * Examples of creating a record at DB using sequelize
 */
// Product.create({
//   title: "A Great Book",
//   imageUrl:
//     "https://images.unsplash.com/photo-1549122728-f519709caa9c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=925&q=80",
//   price: 19.99,
//   description: "A very interesting book!",
// });
// Product.create({
//   title: "Champagne",
//   imageUrl:
//     "https://cdn.pixabay.com/photo/2019/01/28/23/44/champagne-3961509_960_720.jpg",
//   price: 999.99,
//   description: "Very expensive!",
// });

/**
 * Examples of saving data to file
 */
// import fs from 'fs';
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
