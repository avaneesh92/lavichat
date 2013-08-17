<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="/socket.io/socket.io.js"></script>
<script src="/siofu/client.js"></script>

    var sock = io.connect('lavichat.herokuapp.com');
	 $(function() {
	 
	 
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
    });
	