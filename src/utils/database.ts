import { Sequelize } from "sequelize";

/**
 * Example of using mysql2 directly
 */
// import mysql from 'mysql2';
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "password",
// });
// export const db = pool.promise();
// db.execute("SELECT * FROM products").then((queryResults) => {
//   callback(queryResults[0] as Product[]);
// });

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "password",
  database: "node-complete",
});
