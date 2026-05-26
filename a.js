import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Here is a server in Node.js.");
});

server.listen(3000, () =>
  console.log("Server is running on http://localhost:3000"),
);
