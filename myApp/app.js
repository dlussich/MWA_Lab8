var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session=require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var cons = require('consolidate');
var mongo=require('mongoskin');
var csurf = require('csurf');

var index = require('./routes/index');
var users = require('./routes/users');
var newsletter=require('./routes/newsletter');
var secret=require('./routes/secret');
var location=require('./routes/location');

var app = express();
var db=mongo.db("mongodb://127.0.0.1:27017/homework7", {native_parser:true});

// view engine setup
app.engine('html',cons.swig);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

//set up extra configuration asked in Lab 5
app.enable('trust proxy');
app.set('x-powered-by',false);
/*app.set('strict routing', true);
app.enable('case sensitive routing');*/


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(function(req,res,next){
  req.db = db;
  next();
  db.close();
})
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'ssshhhhh'}));
app.use(cookieParser());
app.use(validator());
app.use(express.static(path.join(__dirname, 'public')));
app.use(csurf());


// csurf validation
app.use(['/newsletter','/location'], function(request, response, next){
  response.locals.csrftoken = request.csrfToken();
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/newsletter', newsletter);
app.use('/secret', secret);
app.use('/location', location);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;

app.listen(7800, function(){
  console.log('Server listenting to port 7800...');
});
