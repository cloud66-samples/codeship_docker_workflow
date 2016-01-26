
var express = require('express');
var app = express();
var router = express.Router();              
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'mysql.cloud66.local',
  user     : 'test',
  password : 'test',
  database : 'test'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected to mysql as id ' + connection.threadId);
  connection.query('CREATE DATABASE IF NOT EXISTS test');
  connection.query("DROP TABLE IF EXISTS cats");
  connection.query("CREATE TABLE IF NOT EXISTS cats (name text,id int NOT NULL AUTO_INCREMENT,PRIMARY KEY (id))");
});


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log("request = " + req.originalUrl);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/cats', function(req, res) {
   connection.query('SELECT * FROM cats', {}, function(err, result, fields) {
   if (err) throw err;
    res.json(result);
  });
});

router.post('/cats', function(req, res) {
  connection.query('INSERT INTO cats SET ?', {name: "" + req.body.name}, function(err, result, fields) {
    if (err) throw err;
    res.json({message: 'cat added'});
  });
});

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});