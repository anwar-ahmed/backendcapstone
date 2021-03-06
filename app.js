var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var indexRouter = require('./routes/incident');
var profileRouter = require('./routes/profile')
var incidentRouter = require('./routes/incident')
var notificationRouter = require('./routes/notification')
var sosservicesRouter = require('./routes/sosservices')
var nonsosservicesRouter = require('./routes/nonsosservices')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Connect to db 

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/esim');
mongoose.connect('mongodb+srv://testuser:testuser@cluster0-sgehz.mongodb.net/esim?retryWrites=true',{ useNewUrlParser: true });


 var db = mongoose.connection;
db.on('error', function (err) {
  console.log('Connection error', err);
});
db.once('open', function () {
 console.log('Connected to DB.');
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(cors()); 
app.use(passport.initialize());
app.use(passport.session());

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
 var flash = require('connect-flash');
 app.use(flash());
 
 // Initialize Passport
 var initPassport = require('./passport/init');
 initPassport(passport);


app.use('/profile',profileRouter);
app.use('/incident',incidentRouter);
app.use('/notification',notificationRouter);
app.use('/sosservices',sosservicesRouter);
app.use('/nonsosservices',nonsosservicesRouter);


var users = require('./routes/users')(passport);
app.use('/users', users);


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

module.exports = app;
