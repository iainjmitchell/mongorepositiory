var mongoDb = require("mongojs");

var MongoRepository = function(connectionString, objectName){
    var collection = mongoDb.connect(connectionString, [objectName]);

    this.add = function(value, callback) {
        collection[objectName].save(value, callback);
    };

    this.get = function(id, callback){
        collection[objectName]
            .findOne({
                _id : id
            }, function(error, document){
                callback(document);
            });
    };

    this.find = function(query, callback) {
        collection[objectName].find(query, function(error, documents) {
            callback(documents);
        });
    };

    this.update = function(query, value) {
        collection[objectName]
            .update(query, {$set: value}, {multi: true});
    };

    this.remove = function(query, callback) {
        collection[objectName].remove(query,callback);
    };
};

exports.Repository = MongoRepository;