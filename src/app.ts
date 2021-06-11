// const http = require("http");
import http from "http";

// const routes = require("./routes.ts");
import routes from "./routes";

const server = http.createServer(routes.requestHandler);

server.listen(3000);
