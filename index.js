const http = require("http");
const url = require("url");
const fs = require("fs");

const port = 8080;

const errorPage = fs.readFileSync("404.html", "utf8", (err, res) => {
  if (err) {
    console.log(err);
    return;
  }
});

http
  .createServer((req, res) => {
    let parsedUrl = url.parse(req.url).pathname;
    let fileName = "";
    if (parsedUrl === "/") fileName = "." + parsedUrl + "index.html";
    else fileName = "." + url.parse(req.url).pathname + ".html";

    fs.readFile(fileName, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end(errorPage);
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  })
  .listen(port);
