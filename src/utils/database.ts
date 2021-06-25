import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "password",
});

export const db = pool.promise();
