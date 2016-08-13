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
var pass="st123";
var nick="";
var photo="";
var SocketIOFileUploadServer = require('socketio-file-upload');
var app = require('express')().use(SocketIOFileUploadServer.router)
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server,{ log: false});
 app.use(express.bodyParser()); 
// app.use(express.logger()); //uncomment to eneble express logs

  server.listen(port);
/* Static request handlers                    */
app.get('/', function(request, response){
  response.sendfile(__dirname + "/login.html");
});

app.get('/photo', function(request, response){
  console.log(photo);
  console.log(request.path);
  response.sendfile(__dirname +"/"+photo );
});

app.get('/jquery.min.js', function(request, response){
  response.sendfile(__dirname + "/jquery.min.js");
});

app.get('/logo.png', function(request, response){
  response.sendfile(__dirname + "/logo.png");
});
app.get('/beep.wav', function(request, response){
  response.sendfile(__dirname + "/beep.wav");
});
app.get('/lavi.js', function(request, response){
  response.sendfile(__dirname + "/lavi.js");
});
app.post('/index.html', function(request, response){
  if(request.body.pass===pass){
      nick=request.body.nick;
      response.sendfile(__dirname + "/index.html");
	  }
  else{
      response.sendfile(__dirname + "/login.html");
      }	  
});
/*Socket.io config for xhr long polling because heroku does 
not supports websockets*/
io.configure(function () { 
  io.set("transports", ["websocket","xhr-polling"]); 
  io.set("polling duration", 10); 
});
/*Socket event listening and responses*/
io.sockets.on('connection', function (socket) {
    var uploader = new SocketIOFileUploadServer();
    uploader.dir = __dirname;
    uploader.listen(socket);
    // Event on file is saved:
    uploader.on("saved", function(event){
	    photo=event.file.name;
		socket.broadcast.emit('message', { msg:'<br><b>INFO :: </b>'+nick+' shared a photo' });
		socket.emit('message', { msg:'<b>INFO :: </b> Your photo is shared' });
        socket.broadcast.emit('photo',{photoName:event.file.name});
		socket.emit('photo',{photoName:event.file.name});
		
    });
	
    socket.emit('nick', { nick:nick });
    socket.broadcast.emit('message', { msg:'<b>INFO :: </b>'+nick+' has joined the chat' });
    socket.on('send', function (data) {
        socket.broadcast.emit('message', data);
    });
});
