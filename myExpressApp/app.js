require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// NOTA: Agregar el parser para hacer la API REST
const bodyParser = require('body-parser');

// NOTA: Agregar el modulo de mongoose para integrar con MongoDB
var mongoose = require('mongoose');

// NOTA: Agregar CORS para permitir Cross-Origin
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// NOTA: Indicarle que use el CORS
app.use(cors());

// NOTA: Agregar el parser para hacer la API REST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// NOTA: Sobreescribe el puerto al 8080 (3000 es el que utiliza express por defecto)
const appPort = process.env.PORT || 8080;
app.set('port', appPort);
console.log(`Puerto utilizado: ${appPort}`);
console.log(`Puerto utilizado: ${process.env.PORT}`);
console.log(`Puerto utilizado: ${process.env.PORT || 8080}`);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// NOTA: Agregar la configuración de la BD
const settings = {
  host:     process.env.MONGODB_HOST || '127.0.0.1',
  port:     process.env.MONGODB_PORT || '27017',
  db:       process.env.MONGODB_DB || 'first-mongodb-database'
}

// NOTA: Agregar la conexión con la BD
const mongoUrl = 'mongodb://' + settings.host + ':' + settings.port + '/' + settings.db;
mongoose.connect(mongoUrl, { useNewUrlParser: true });

module.exports = app;
