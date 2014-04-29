var RestServer = require('./lib/rest-server.js').RestServer;

var server = new RestServer();
	server.listen(9090);