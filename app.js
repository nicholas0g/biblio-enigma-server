var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

//setup jade come engine visivo
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//definisco le route per questa app
app.use('/', index);
app.use('/api', api);

//restituisco errori se si arriva ad un route inesistente
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// gestisco gli errori
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // mostro il messaggio di errore
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000,function(){console.log("Servizio in esecuzione correttamente")});
module.exports = app;
