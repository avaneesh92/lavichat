/*  LAVICHAT for heroku (node.js application
file-- serve.js; main server module using express
created on 14/8/2013
By- Avaneesh Tripathi (avaneesh92@gmail.com)
Description--
Main server module built using express 3.x.x.
socket.io is used for data transportation
*Static single password is used
*no session or even nick name
*/

var port = process.env.PORT || 5000;
var express=require('express');
var pass="pentium@5192126";
var nick="";
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server,{ log: false});

 app.use(express.bodyParser()); 

  server.listen(port);
app.get('/', function(request, response){
  response.sendfile(__dirname + "/login.html");
});
app.get('/logo.png', function(request, response){
  response.sendfile(__dirname + "/logo.png");
});
app.get('/beep.wav', function(request, response){
  response.sendfile(__dirname + "/beep.wav");
});
app.post('/index.html', function(request, response){
  if(request.body.pass===pass){
      nick=request.body.nick;
	  console.log(nick);
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
    socket.emit('nick', { nick:nick });
    socket.broadcast.emit('message', { msg:nick+' has joined the chat' });
    socket.on('send', function (data) {
        socket.broadcast.emit('message', data);
    });
});
