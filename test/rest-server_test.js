'use strict';
var request = require('request');
//var RestServer = require('../lib/rest-server.js').RestServer;

/**
 * If server is not running use this to start server before tests.
 var mockServer = null;
    mockServer = new RestServer();
    mockServer.listen(9090);
 */

var endpoint = 'http://localhost:9090';
var expected = {
	message: 'RESTful Node API Server'
};
//Actuall Tests
exports.RestServer = {
	setUp: function (done) {
		done();
	},
	'GET /api': function (test) {
		test.expect(1);

		//send request
		request(endpoint + '/api', function(error, response, body){
			test.deepEqual(JSON.parse(body), expected, 'should return RESTful message');
			test.done();
		});
	},
	'GET /api/posts': function (test) {
		//send request
		request(endpoint + '/api', function(error, response, body){
			test.deepEqual(JSON.parse(body), expected, 'should handle GET query request');
			test.done();
		});
	},
	'GET /api/posts/1': function (test) {
		//send request
		request(endpoint + '/api', function(error, response, body){
			test.deepEqual(JSON.parse(body), expected, 'should handle GET request');
			test.done();
		});
	},
	'POST /api/posts': function (test) {
		expected.message = 'Create item in posts';

		request(endpoint + '/api', function(error, response, body){
			test.deepEqual(JSON.parse(body), expected, 'should handle POST request');
			test.done();
		});
	},
	'PUT /api/posts/1': function (test) {
		expected = '';
		request(endpoint + '/api/posts/1', function(error, response, body){
			test.deepEqual(JSON.parse(body), expected, 'should handle PUT request');
			test.done();
		});
	},
	'DELETE /api/posts/1': function (test) {
		request(endpoint + '/api/posts/1', function(error, response, body){
			test.deepEqual(JSON.parse(body), expected, 'should handle DELETE request');
			test.done();
		});
	}
};
