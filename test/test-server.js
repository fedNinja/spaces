var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();
var app = server.app;
chai.use(chaiHttp);

describe('home page', function(){
	it('should exists', function(){
		chai.request(app)
		.get('/')
		.end(function(response,err){
			response.should.have.status(200);
			response.should.be.html;
			done();
		});
	});
});