import http from "node:http";
import { data } from "./data";

const server = http.createServer((req, res) => {
  res.end(JSON.stringify(data));
});
