var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
const verbiageBuilder = require('./helper/verbiageBuilder');
const cors = require('cors');

const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200
}

var app = express();

// view engine setup
app.use(express.static(__dirname + '../public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'jade');
app.use(cors(corsOptions));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'sdk')));

// verbiageRespData = verbiageBuilder();
verbiage_En_RespData = verbiageBuilder("ESI_PHA_BOT_RESP_BUILDER_EN_CA.xlsx");
verbiage_Fr_RespData = verbiageBuilder("ESI_PHA_BOT_RESP_BUILDER_FR_CA.xlsx");

// app.use('/', routes);
app.use('/api/users/sts', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
