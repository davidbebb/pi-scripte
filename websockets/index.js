var express = require('express'); //Our http server
var morgan = require('morgan'); // A rather nice logger
var debug = require('tracer').colorConsole({level:'info'}); // Debugger
// var wpi = require('wiring-pi');
var port = process.env.PORT || 3000; // If env var PORT is set, use it, or default to 3000

// Start building our server
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

// Give us a useful route trace
app.use(morgan('dev'));

// Set static files to be served from ./public, and how long content shoule be cached
var oneDay = 86400000;
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

// Add bower as a static, because we need this to work offline
app.use('/bower_components',  express.static(__dirname + '/bower_components', { maxAge: oneDay }));

// Directory to serve updateable js from
app.use('/frontJs', express.static(__dirname + '/frontJs', {maxAge: 0}));

// Set dynamic files to be in ./views
app.set('views', __dirname + '/views');

// Set dynamic view interpreter to ejs
app.set('view engine', 'ejs');

// Our very first (and probably only) route in this app.
app.get('/', function (req, res) {
  res.render('index');
});

//Set the port - to use ports below 1024 you need to be sudo.
server.listen(port, function () {
  debug.info('App listening on port', port);
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


module.exports = app;
