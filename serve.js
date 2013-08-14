/*Chat server for heroku
created on 14/8/2013
By- Avaneesh Tripathi (avaneesh92@gmail.com)
*/
var serve = require("./fu");
var chat = require("./chat");
var express = require("express");
var sio = require('socket.io');

var app = express();
app.use(express.logger());

app.get("/", serve.staticHandler("index.html"));
app.get("/chat",chat.chatHandler);
var io = sio.listen(app);
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
