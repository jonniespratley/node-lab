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
		request(endpoint + '/api', function (error, response, body) {
			test.deepEqual(JSON.parse(body), expected, 'should return RESTful message');
			test.done();
		});
	},
	'GET /api/posts': function (test) {
		expected.message = 'Query items in posts';
		request({
			uri: endpoint + '/api/posts',
			method: 'GET'
		}, function (error, response, body) {
			test.deepEqual(JSON.parse(body), expected, 'should get all items');
			test.done();
		});
	},
	'GET /api/posts/1': function (test) {
		expected.message = 'Read item 1 in posts';
		request({
			uri: endpoint + '/api/posts/1',
			method: 'GET'
		}, function (error, response, body) {
			test.deepEqual(JSON.parse(body), expected, 'should get 1 item');
			test.done();
		});
	},
	'POST /api/posts': function (test) {
		expected.message = 'Create item in posts';
		request({
			uri: endpoint + '/api/posts',
			method: 'POST',
			json: {
				"title": "Post Title"
			}
		}, function (error, response, body) {
			test.deepEqual(JSON.parse(body), expected, 'should create item');
			test.done();
		});
	},
	'PUT /api/posts/1': function (test) {
		expected.message = 'Update item 1 in posts';
		request({
			uri: endpoint + '/api/posts/1',
			method: 'PUT',
			json: {
				_id: 1,
				title: 'Updated title'
			}
		}, function (error, response, body) {
			test.deepEqual(JSON.parse(body), expected, 'should should update item');
			test.done();
		});
	},
	'DELETE /api/posts/1': function (test) {
		expected.message = 'Delete item 1 in posts';
		request({
			uri: endpoint + '/api/posts/1',
			method: 'DELETE'
		}, function (error, response, body) {
			test.deepEqual(JSON.parse(body), expected, 'should should delete item');
			test.done();
		});
	}
};
