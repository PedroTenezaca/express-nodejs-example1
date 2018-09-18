var express = require('express');
var bodyPaser = require('body-parser');
var path = require('path');

var app = express();

/*
var logger = function (req, res, next) {
    console.log('Logging...');
    next();   
}

app.use(logger);
*/
//View Engine
app.set('view engine', 'ejs');


//Body parser middleware
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended: false}));

var router = express.Router();
// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });
  
  // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
  router.use('/user/:id', function(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
  }, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
  });
  
  // a middleware sub-stack that handles GET requests to the /user/:id path
  router.get('/user/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next router
    if (req.params.id == 0) next('route');
    // otherwise pass control to the next middleware function in this stack
    else next(); //
  }, function (req, res, next) {
    // render a regular page
    res.send('regular');
  });
  
  // handler for the /user/:id path, which renders a special page
  router.get('/user/:id', function (req, res, next) {
    console.log(req.params.id);
    res.send('special');
  });
  
  // mount the router on the app
  app.use('/', router);

app.listen(3000, function() {
app.listen(port, function() {
    console.log('Servidor ejecutandose en puerto 3000!');
})