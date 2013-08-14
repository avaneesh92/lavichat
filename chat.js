/*
Part of lavichat on heroku
By- Avaneesh Tripathi (avaneesh92@gmail.com)
*/
var chat = exports;
chat.chatHandler= function (req,res){
      res.writeHead(200, {"Content-Type": "text/plain"});
	  res.write("Avaneesh");
	  res.end();
	  }