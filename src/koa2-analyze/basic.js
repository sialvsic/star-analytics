const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200);
    res.end("hello in world");
  })
  .listen(3001);
