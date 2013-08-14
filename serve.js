var serve = require("./fu");
var chat = require("./chat");
serve.listen(80);
serve.get("/", serve.staticHandler("index.html"));
serve.get("/jquery.min.js", serve.staticHandler("jquery.min.js"));
serve.get("/chat",chat.chatHandler);