var chat = exports;
chat.chatHandler= function (req,res){
      res.writeHead(200, {"Content-Type": "text/plain"});
	  res.write("Avaneesh");
	  res.end();
	  }