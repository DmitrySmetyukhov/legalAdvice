var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var session = require('express-session');

var index = require('./routes/index');
// var cards = require('./routes/cards');
// var auth = require('./routes/auth');
// var infinitives = require('./routes/infinitives');
// var categories = require('./routes/categories');

var app = express();


const forceSSL = function() {
  return function (req, res, next) {
    if (!req.headers['x-forwarded-proto'] || req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};

app.use(forceSSL());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    console.log('!OPTIONS');
    res.status(200).send();
  } else {
    next();
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


// var sessionStore = require('./lib/sessionStore');
// app.use(session({
//   secret           : config.get('session:secret'),
//   key              : config.get('session:key'),
//   resave           : config.get('session:resave'),
//   saveUninitialized: config.get('session:saveUninitialized'),
//   cookie           : config.get('session:cookie'),
//   store            : sessionStore
// }));

app.use(express.static(path.join(__dirname, '/dist/legalAdvice')));

// console.log(path.join(__dirname, '/dist/legalAdvice'))





app.use('/', index);
// app.use('/card', cards);
// app.use('/infinitive', infinitives);
// app.use('/auth', auth);
// app.use('/categories', categories);

app.get('/*', function (req, res) {
  res.sendfile(path.join(__dirname + '/dist/legalAdvice/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message || err);
  // res.render('error');
});

module.exports = app;
