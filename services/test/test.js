var supertest = require("supertest");
var mysql   = require('mysql');

describe("setup", function() {
  it("should reset the database",function(done){
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
      connection.query("DROP TABLE IF EXISTS cats");
      connection.query("CREATE TABLE IF NOT EXISTS cats (name text,id int NOT NULL AUTO_INCREMENT,PRIMARY KEY (id))");
    });
    done();
  });
});




//run all the test
describe("the wonderful cat API",function(){
  var test_server = supertest.agent("http://" + process.env.API_ADDRESS);

  it("should create a cat",function(done){
  	test_server
  	.post("/api/cats")
  	.send({name: 'kees'})
  	.expect(200, {
    	message: 'cat added'
    },done);
  });

  it("should list all cats",function(done){
  	test_server
  	.get("/api/cats")
  	.expect(200, [{
    	name: 'kees',
    	id: 1
    }],done);
  });
});