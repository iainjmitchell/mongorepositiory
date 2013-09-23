var mongoDb = require("mongojs");

var MongoRepository = function(connectionString, objectName){
    var collection = mongoDb.connect(connectionString, [objectName]);

    this.add = function(value, callback) {
        return collection[objectName].save(value, callback);
    };

    this.find = function(query, callback) {
        return collection[objectName].find(query, function(err, docs) {
            return callback(docs);
        });
    };

    this.update = function(query, value) {
      return collection[objectName]
        .update(query, {$set: value}, {multi: true});
    };

    this.remove = function(query,callback) {
      return collection[objectName].remove(query,callback);
    };
};

exports.Repository = MongoRepository;