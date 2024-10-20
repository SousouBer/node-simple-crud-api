import http from "node:http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/plain");
  res.write("<h1>hello World!</h1>");
  res.end();
});

server.listen(3000, () => console.log("Running on PORT 3000!"));
