
var express = require('express');
var app = express();


var router = express.Router();              

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log(req);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/cats', function(req, res) {
	res.json('{}');
});

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});