lavichat
========

For running this app install node.js and npm first
then using npm install express ( npm install express) and socket.io (npm install socket.io).
After successful installation run node serve.js from the project root directory.

NOTE..
you have to edit two thing
1. In 'index.html' edit "var sock = io.connect('your domain');" . if you are running localy insert 
'localhost:5000'. 5000 is the port number used by server configured in 'serve.js'.
2. In 'serve.js' edit  "var pass="XXXXX";" place your password in place of XXXXX.


After editing run server using 'node serve.js' and visit browser localhost:5000
