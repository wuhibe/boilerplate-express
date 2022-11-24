let express = require("express");
let app = express();

app.route("/").get(function (req, res) {
  console.log("Hello World");
});







module.exports = app;
