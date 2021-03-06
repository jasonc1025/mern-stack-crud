var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mern-crud', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() => { 
    console.log(
      '  * Insure MongDB server is up: \'mongod.exe --dbpath .\mongodb\data\' \n' +
      '  * Then can do a \'npm run buld\' and later \'npm start\' \n' +
      '  * Afterwards, use browser on \'http://localhost:3000\' or \'http://localhost:3000/book\' \n'
    ); 
    console.log('* Connection succesful');
  })
  .catch((err) => { 
    console.log(
      '  * Insure MongDB server is up: \'mongod.exe --dbpath .\mongodb\data\' \n' +
      '  * Then can do a \'npm run buld\' and later \'npm start\' \n' +
      '  * Afterwards, use browser on \'http://localhost:3000\' or \'http://localhost:3000/book\' \n'
    );
    console.error(err);
  });

var book = require('./routes/book');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/book', book);

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
