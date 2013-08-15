/*Chat server for heroku
created on 14/8/2013
By- Avaneesh Tripathi (avaneesh92@gmail.com)
*/

var port = process.env.PORT || 5000;

var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server,{ log: false });

  server.listen(port);

app.get('/', function(request, response){
  response.sendfile(__dirname + "/index.html");
});

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
    socket.emit('message', { msg: 'welcome to the chat' });
    socket.on('send', function (data) {
        socket.broadcast.emit('message', data);
    });
});
