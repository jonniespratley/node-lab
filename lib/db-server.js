/*
 db-server
 This is the resource object that contains all of the REST api methods for a full CRUD on a mongo account document.
 */

exports.DbServer = function (options) {

	var mongoose = require( "mongoose" );

	var log = function () {
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
				}
			}
			this.instance = mongoose.connect( "mongodb://" + host );
		},
		disconnect: function () {

		},
		findAll: function (table) {
			if(!models[table]){
				throw new Error('Must add table to options.')
			}
			models[table].find( function (err, m) {
				if (!err) {
					return m;
				} else {
					return false;
				}
			} );
		},
		findOne: function (table, id) {
			if(!models[table]){
				throw new Error('Must add table to options.')
			}
			models[table].findById( id, function (err, m) {
				if (!err) {
					return m;
				} else {
					return false;
				}
			} );
		},
		create: function (table, data) {
			if(!models[table]){
				throw new Error('Must add table to options.')
			}
			var model = new models[table]( data );
			model.save( function (err, m) {
				if (!err) {
					return m;
				} else {
					return false;
				}
			} );
		},
		update: function (table, id, data) {
			models[table].findByIdAndUpdate( id, data, function (err, m) {
				if (!err) {
					return m;
				} else {
					return false;
				}
			} );
		},
		destroy: function (table, id) {
			models[table].findByIdAndRemove( id, function (err, m) {
				if (!err) {
					log( m );
					return m;
				} else {
					return false;
				}
			} );
		}
	};
	return db;
};
