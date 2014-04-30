/*
 db-server
 This is the resource object that contains all of the REST api methods for a full CRUD on a mongo account document.
 TODO Clean up this file

 @author Jonnie Spratley,
 @created 10/23/12
 REST METHODS:

 HTTP     METHOD          URL
 ======|==============|==============================================
 GET      findAll         http://localhost:3000/api/v2/database/table
 GET      findById        http://localhost:3000/api/v2/database/table/:id
 POST     add             http://localhost:3000/api/v2/database/table
 PUT      update          http://localhost:3000/api/v2/database/table/:id
 DELETE   destroy         http://localhost:3000/api/v2/database/table/:id
 */

exports.DbServer = function (options) {
	var Post, PostModel, app, application_root, delay, express, log, mongoose, path, port;

	mongoose = require( "mongoose" );

	delay = function (ms, value) {
		var deferred;
		deferred = new Deferred();
		return setTimeout( (function () {
			deferred.resolve( value );
		}), ms );
	};

	log = function () {
		return console.log( arguments );
	};
	var models = {};

	var db = {
		models: {},
		instance: null,
		getInstance: function () {
			if (this.instance) {
				return this.instance;
			} else {
				return false;
			}
		},
		model: function (name, schema) {
			return mongoose.model( name, new mongoose.Schema( schema ) );

		},
		connect: function (host) {
			var self = this;
			if (options.models) {
				for (var m in options.models) {
					var model = mongoose.model( m, new mongoose.Schema( options.models[m] ) );
					models[m] = model;
					log(models[m]);
				}
			}
			this.instance = mongoose.connect( "mongodb://" + host );
		},
		disconnect: function () {

		},
		findAll: function (table) {
			models[table].find( function (err, m) {
				if (!err) {
					log(m);
					return m;
				} else {
					return err;
				}
			} );
		},
		findOne: function (table, id) {
			models[table].findById( id, function (err, m) {
				if (!err) {
					log(m);
					return m;
				} else {
					return false;
				}
			} );
		},
		create: function (table, data) {
			var model = new models[table]( data );
			model.save( function (err, m) {
				if (!err) {
					log(m);
					return m;
				} else {
					return false;
				}
			} );
		},
		update: function (table, id, data) {
			models[table].findByIdAndUpdate( id, data, function (err, m) {
				if (!err) {
					log(m);
					return m;
				} else {
					return false;
				}
			} );
		},
		destroy: function (table, id) {
			models[table].findByIdAndRemove( id, function (err, m) {
				if (!err) {
					log(m);
					return m;
				} else {
					return false;
				}
			} );
		}
	};
	return db;
};
