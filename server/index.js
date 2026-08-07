const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.write("Jesus is LORD");
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
