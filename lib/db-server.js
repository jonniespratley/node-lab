
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
var Post, PostModel, app, application_root, delay, express, log, mongoose, path, port;
Post = new mongoose.Schema({
    title: String,
    slug: String,
    body: String,
    image: String,
    published: Boolean,
    tags: Array,
    created: Date,
    modified: Date
});
PostModel = mongoose.model("Post", Post);
db.models.posts = PostModel;
var Model = mongoose.model("Model", Post);

delay = function(ms, value) {
    var deferred;
    deferred = new Deferred();
    return setTimeout((function() {
        deferred.resolve(value);
    }), ms);
};

log = function() {
    return console.log(arguments);
};

mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/learning-yeoman");








var db = {
    models: {},
    connect: function(){

    },
    disconnect: function(){

    },
    findAll: function(table){
        this.models[table].find(function(err, data) {
            if (!err) {
                return data;
            } else {
                return err;
            }
        });
    },
    findOne: function(table, id){
        this.models[table].findById(request.params.id, function(err, model) {
            if (!err) {
                return model;
            } else {
                return false;
            }
        });
    },
    create: function(table, data){
        var model;
        model = new Model({
            title: request.body.title,
            slug: request.body.slug,
            body: request.body.body,
            image: request.body.image,
            published: request.body.published,
            tags: request.body.tags,
            created: new Date(),
            modified: new Date()
        });
        model.save(function(err) {
            if (!err) {
                return model;
            } else {
                return false;
            }
        });
    },
    update: function(table, data) {

    },
    destroy: function(table, id){

        db.models[table].findByIdAndRemove(id, function(model) {
            if(model){
                return model;
            } else {
                return false;
            }
        });
    }
};

return db;





