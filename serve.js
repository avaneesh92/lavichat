/*Chat server for heroku
created on 14/8/2013
By- Avaneesh Tripathi (avaneesh92@gmail.com)
*/

var port = process.env.PORT || 5000;
var express=require('express');
var pass="pentium@5192126";
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server,{ log: true});

 app.use(express.bodyParser()); 

  server.listen(port);
app.get('/', function(request, response){
  response.sendfile(__dirname + "/login.html");
});
app.get('/beep.wav', function(request, response){
  response.sendfile(__dirname + "/beep.wav");
});
app.post('/index.html', function(request, response){
  if(request.body.pass===pass){
      response.sendfile(__dirname + "/index.html");
	  }
  else{
      response.sendfile(__dirname + "/login.html");
      }	  
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
