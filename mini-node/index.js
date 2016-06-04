var express = require('express');
var app = express();
var morgan = require('morgan');
var debug = require('tracer').colorConsole({level:'info'});;

app.use(morgan('dev'));

app.get('/', function (req, res) {
  debug.info(req.host);
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
