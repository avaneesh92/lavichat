    var serverPath = "http://lavichat.herokuapp.com/";
    var sock = io.connect('lavichat.herokuapp.com');
	var siofu = new SocketIOFileUpload(sock);
	 $(function() {
	 
	 function appendImg(photo){
	 $("<img height=400 src="+serverPath+"photo />").appendTo("#log");
	 document.title = 'New Photo!! in the Room';//change title on new photo
	 }
	 document.getElementById("upload").addEventListener("click", siofu.prompt, false);
	 
	 
	 $('#log').mouseenter(function() { //clear title when user sees the new msg
       document.title='LAVI Chat Room';
    });
	
	
    var snd = new Audio("beep.wav"); // buffers automatically when created
    var msge = $("#msg");
    var nick="";
	var log = $("#log");
	
	
	function sendMsg(){
	var d = log[0]
    var doScroll = d.scrollTop == d.scrollHeight - d.clientHeight;
	var s_msg = "<h4>"+nick+"</h4>"+" >> "+msge.val();
	$("<span>"+s_msg+"</span><br>").appendTo("#log");
	sock.emit('send',{msg:s_msg});
	if (doScroll) {
            d.scrollTop = d.scrollHeight - d.clientHeight;
        }
	
	}
	
	
	function logMsg(data){
	var d = log[0]
    var doScroll = d.scrollTop == d.scrollHeight - d.clientHeight;
	document.title = 'New Message!! in the Room';//change title on new msg
	$("<span>"+data.msg+"</span><br>").appendTo("#log");
	snd.play();
	if (doScroll) {
            d.scrollTop = d.scrollHeight - d.clientHeight;
        }
	
	}
	
	
    $("#form").submit(function() {
        
        if (!msge.val()) {
            return false;
        }
        sendMsg();
        msge.val("");
        return false
    });
	
	
    sock.on('message', logMsg);
    sock.on('nick', function (data){
	nick=data.nick;	
	});
	sock.on('photo',appendImg);
    });
	