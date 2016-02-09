var express = require('express');
var mysql   = require('mysql');


var startServer = function(port) {
  var app = express();
  var router = express.Router();              
  var bodyParser = require('body-parser');
  app.use(bodyParser.json()); // for parsing application/json

  var connection = mysql.createConnection({
    host     : process.env.MYSQL_ADDRESS,
    user     : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
  });

  connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  connection.query("CREATE DATABASE IF NOT EXISTS " + process.env.MYSQL_DATABASE);
  connection.query("CREATE TABLE IF NOT EXISTS cats (name text,id int NOT NULL AUTO_INCREMENT,PRIMARY KEY (id))");
  });
  
  // middleware to use for all requests
  router.use(function(req, res, next) {
      console.log(req.method + " request = " + req.originalUrl);
      console.log(req.body);
      next();
  });

  router.get('/health', function(req, res) {
    res.json({health: 'ok'});
  });

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

  router.delete('/cats', function(req, res) {
    connection.query("DROP TABLE cats");
    connection.query("CREATE TABLE IF NOT EXISTS cats (name text,id int NOT NULL AUTO_INCREMENT,PRIMARY KEY (id))");
    res.json({message: 'all cats removed'});
  });


  // all of our routes will be prefixed with /api
  app.use('/api', router);
  console.log("api server listen to port " + port);
  return app.listen(port);
}

module.exports = startServer;






