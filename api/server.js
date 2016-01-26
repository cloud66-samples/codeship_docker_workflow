var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb.cloud66.local/test');

var express = require('express');
var app = express();


//define a new mongo db model
var kittySchema = mongoose.Schema({
    name: String
});
var Kitten = mongoose.model('Kitten', kittySchema);


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/cats', function(req, res) {
    Kitten.find(function (err, kittens) {
	if (err) return console.error(err);
		res.json(kittens);
	})   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);



app.listen(80, function () {
  console.log('Example app listening on port 80!');
});