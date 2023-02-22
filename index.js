const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");
const logfile =fs.createWriteStream('./static/logger.txt');
const time = (new Date).toLocaleTimeString().toUpperCase();
const date = (new Date).toLocaleDateString();
const datentime = `${date}, ${time}`;
console.log(datentime)

function returnFile(pathName, res, onError) {
  fs.readFile(pathName, function (err, data) {
    if (err) {
      onError(err);
      fs.appendFile("static/logger.txt",  `Failed to Load ${pathName} at ${datentime} \n` , (err) => {
        if (err) {
          console.log(err);
        }
        else {
          // Get the file contents after the append operation
          console.log("\nFile Contents of file after append:",
            fs.readFileSync("static/logger.txt", "utf8"));
        }
      });
    } else {
      res.end(data.toString());
      fs.appendFile("./logger.txt", `Succeeded to Load ${pathName} at ${datentime} \n`, (err) => {
        if (err) {
          console.log(err);
        }
        else {
          // Get the file contents after the append operation
          console.log("\nFile Contents of file after append:",
            fs.readFileSync("static/logger.txt", "utf8"));
        }
      });
    }
  });
}

http
  .createServer(function (req, res) {
    const filepath = url.parse(req.url);
    console.log(filepath);
    const pathName = filepath.pathname;
    const file = pathName === "/" ? "home.html" : pathName;
    console.log(file);
    const extension = file.split(".").pop();

    res.writeHead(200, { "Content-type": `text/${extension}` });
    const fileToRead = path.join(__dirname, "static", file);

    returnFile(fileToRead, res, function (err) {
      returnFile(
        path.join(__dirname, "static/error.html"),
        res,
        function (err) {
          res.end("There was an Error");
        }
      );
    });

    //   fs.appendChild('./static/logger.txt', function (err, data) {
    //        if(err) {

    //        } else {
    //         const date = (new Date).toLocaleDateString();

    //        }
    //     })
  })
  .listen(8080);

console.log("Running on Port 8080");
