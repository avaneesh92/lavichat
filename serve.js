var serve = require("./fu");
var chat = require("./chat");
serve.listen(process.env.port);
serve.get("/", serve.staticHandler("index.html"));
serve.get("/jquery.min.js", serve.staticHandler("jquery.min.js"));
serve.get("/chat",chat.chatHandler);