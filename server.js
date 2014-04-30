var RestServer = require( './lib/rest-server.js' ).RestServer;
var DbServer = require( './lib/db-server.js' ).DbServer;

var port = 9191;
var _server = new RestServer();
_server.listen( port );

var _db = new DbServer( {
	models: {
		'posts': {
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
} );

_db.connect( 'localhost/learning-yeoman' );
_db.findAll( 'posts' );
_db.findOne( 'posts', 1 );


var newId = _db.create( 'posts', {title: 'New Post', body: 'This is the body of the post.', created: new Date()} );

if(newId){
	console.log('Post created', newId);
	_db.destroy( 'posts', newId.id);
}

console.log( 'Server running @ localhost:' + port );