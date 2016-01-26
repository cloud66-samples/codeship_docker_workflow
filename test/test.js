var supertest = require("supertest");
var server = supertest.agent("http://api");

describe("test api",function(){
  it("should create a cat",function(done){
  	server
  	.post("/api/cats")
  	.send({name: 'kees'})
  	.expect(200, {
    	message: 'cat added'
    },done);
  });
  it("should list all cats",function(done){
  	server
  	.get("/api/cats")
  	.expect(200, [{
    	name: 'kees',
    	id: 1
    }],done);
  });
});