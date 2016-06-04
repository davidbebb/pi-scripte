var express = require('express'); //Our http server
var morgan = require('morgan'); // A rather nice logger
var debug = require('tracer').colorConsole({level:'info'}); // Debugger
// var wpi = require('wiring-pi');
var port = process.env.PORT || 3000; // If env var PORT is set, use it, or default to 3000
var WebSocketServer = require('websocket').server; //Start websocket, configured as a server
// var WebSocketClient = require('websocket').client;
// var WebSocketFrame  = require('websocket').frame;
// var WebSocketRouter = require('websocket').router;
// var W3CWebSocket = require('websocket').w3cwebsocket;

// Start building our server
var app = express();

// Give us a useful route trace
app.use(morgan('dev'));

// Set static files to be served from ./public, and how long content shoule be cached
var oneDay = 86400000;
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

// Set dynamic files to be in ./views
app.set('views', __dirname + '/views');

// Set dynamic view interpreter to ejs
app.set('view engine', 'ejs');

// Our very first (and probably only) route in this app.
app.get('/', function (req, res) {
  debug.info(req.host);
  res.send('Hello World!');
});

//Set the port - to use ports below 1024 you need to be sudo.
app.listen(port, function () {
  debug.info('App listening on port', port);
});

var wsServer = new WebSocketServer({
    httpServer: app,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  debug.info('Origin is ', origin);
  var allowed = false;
  if (origin === 'localhost') {
    allowed = true;
  }
  return allowed;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      debug.info((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    debug.info((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            debug.info('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            debug.info('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        debug.info((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        debug.info(description);
    });
});
