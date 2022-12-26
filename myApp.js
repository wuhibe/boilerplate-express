let express = require("express");
let app = express();
let bodyParser = require('body-parser');

console.log("Hello World");
app.use(bodyParser.urlencoded({extended: false}));
app.use("/public", express.static(__dirname + "/public"));
app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
app.get('/name', (req, res) => {
    res.json({name: `${req.query.first} ${req.query.last}`})
});
app.post('/name', (req, res) => {
    res.json({name: `${req.body.first} ${req.body.last}`})
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
app.get('/:word/echo', (req, res) => {
  res.json({echo: req.params.word});
});
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({time: req.time});
});

app.get("/json", function (req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase")
    message = message.toUpperCase();
  res.json({ message });
});

module.exports = app;
