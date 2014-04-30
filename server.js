var RestServer = require('./lib/rest-server.js').RestServer;
var DbServer = require('./lib/db-server.js').DbServer;

var port = 9191;
var _server = new RestServer();
	_server.listen(port);


var _db = new DbServer({
    models:{
        'post': {
            title: String,
            slug: String,
            body: String,
            image: String,
            published: Boolean,
            tags: Array,
            created: Date,
            modified: Date
        }
    }
});

    _db.connect('localhost/learning-yeoman');

console.log('Server running @ localhost:'+port);

_db.findAll('posts')
_db.findOne('posts', 1)