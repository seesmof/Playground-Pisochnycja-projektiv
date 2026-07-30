let http = require("http");
let os = require("os");

http
  .createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(os.platform());
  })
  .listen(8080);
