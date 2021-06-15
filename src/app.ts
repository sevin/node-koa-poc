import express from "express";
import { urlencoded } from "body-parser";
import path from "path";

// const routes = require("./routes.ts");
import routes from "./routes";

import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import { ROOT_PATH } from "./utils/path";

const app = express();

// ejs related configs
app.set("view engine", "ejs");
app.set("views", path.join(ROOT_PATH, "views"));

app.use(urlencoded({ extended: false }));

app.use(express.static("public"));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000);
