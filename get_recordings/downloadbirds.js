const http = require("http"); // or 'https' for https:// URLs
const fs = require("fs");

const file = fs.createWriteStream("file.mp3");
const request = http
  .get("http://www.xeno-canto.org/581686/download", function (response) {
    response.pipe(file);
    file.on("finish", function () {
      file.close(cb); // close() is async, call cb after close completes.
    });
  })
  .on("error", function (err) {
    // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
