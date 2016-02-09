var supertest = require("supertest");
var test_server = supertest.agent("http://" + process.env.API_ADDRESS);
  
describe("start all test", function() {
  it("should remove all existing cats from the database",function(done){
    test_server.delete("/api/cats").send({})
      .expect(200, {message: 'all cats removed'},done);
  });
});

describe("the wonderful cat API",function(){
  it("should create a cat",function(done){
  	test_server.post("/api/cats").send({name: 'kees'})
  	.expect(200, {message: 'cat added'},done);
  });

  it("should list all cats",function(done){
  	test_server.get("/api/cats")
      .expect(200, [{name: 'kees',id: 1}],done);
  });
});