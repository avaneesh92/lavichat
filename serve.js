var serve = require("./fu");
var chat = require("./chat");
var express = require("express");
var app = express();
app.use(express.logger());

app.get("/", serve.staticHandler("index.html"));
app.get("/jquery.min.js", serve.staticHandler("jquery.min.js"));
app.get("/chat",chat.chatHandler);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});