var supertest = require("supertest");
var server = supertest.agent("http://api");

describe("test api",function(){
  it("should return some cats",function(done){
    server
    .get("/api/cats")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      done();
    });
  });

});