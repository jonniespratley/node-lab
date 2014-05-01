var RestServer = require( './lib/rest-server.js' ).RestServer;
var DbServer = require( './lib/db-server.js' ).DbServer;

var port = 9191;
var _server = new RestServer();
_server.listen( port );

/***
 * DB Usage
 * @type {DbServer}
 * @private
 */
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
		},
		'pages': { title: String, slug: String, body: String, published: Boolean},
		'users': { username: String, password: String, email: String, active: Boolean}
	}
} );

_db.connect( 'localhost/learning-yeoman' );

var posts = _db.findAll( 'posts' );
console.log(posts);

var newId = _db.create( 'posts', {
	title: 'New Post',
	body: 'This is the body of the post.',
	created: new Date()
} );


if (newId) {
	console.log( 'Post created', newId );
	_db.destroy( 'posts', newId._id );

	_db.findOne( 'posts', 1 );

}

console.log( 'Server running @ localhost:' + port );