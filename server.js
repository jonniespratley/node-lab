var RestServer = require('./lib/rest-server.js').RestServer;


var port = 9191;
var server = new RestServer();
	server.listen(port);

console.log('Server running @ localhost:'+port);