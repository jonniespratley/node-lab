/**
 * jQuery REST
 * This is a simple object that contains methods to send CRUD operations to the rest-server.js node server.
 *  @filename rest-client.js
 *  @type {{endpoint: string, create: create, read: read, update: update, destroy: destroy, query: query, _send: _send}}
 *
 @author Jonnie Spratley,
 @created 10/23/12
 REST METHODS:

 HTTP     METHOD          URL
 ======|==============|==============================================
 GET      findAll         /api/table
 GET      findById        /api/table/:id
 POST     add             /api/table
 PUT      update          /api/table/:id
 DELETE   destroy         /api/table/:id
 */
/* global $rest jQuery */
var RestClient = function () {
	return {
		endpoint: "/api",
		cache: {},
		create: function (table, data) {
			return this._send( 'POST', table, data );
		},
		read: function (table, data) {
			return this._send( 'GET', table, data );
		},
		update: function (table, data) {
			return this._send( 'PUT', table, data );
		},
		destroy: function (table, data) {
			return this._send( 'DELETE', table, data );
		},
		query: function (table, params) {
			return this._send( 'GET', table, params );
		},
		_send: function (type, table, data) {
			var url, self = this;
			url = this.endpoint + "/" + table;
			if (data != null ? data.id : void 0 && type !== 'GET') {
				url += '/' + (data != null ? data.id : void 0);
			}

			var que = [];
			var ajax = $.ajax( {
				url: url,
				type: type,
				dataType: "json",
				data: data,
				success: function(data){
					self.cache[Date.now()] = {
						url: url,
						response: data
					};
				}
			} );



			return ajax;
		}
	}
};