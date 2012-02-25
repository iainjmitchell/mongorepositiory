(function() {
  var Repository;

  Repository = (function() {

    function Repository(database, objectName) {
      this.objectName = objectName;
      this.db = require("mongojs").connect(database, [this.objectName]);
    }

    Repository.prototype.add = function(value) {
      return this.db[this.objectName].save(value);
    };

    Repository.prototype.find = function(query, callback) {
      return this.db[this.objectName].find(query, function(err, docs) {
        return callback(docs);
      });
    };

    Repository.prototype.update = function(query, value) {
      return this.db[this.objectName].update(query, {
        $set: value
      }, {
        multi: true
      });
    };

    Repository.prototype.remove = function(query) {
      return this.db[this.objectName].remove(query);
    };

    return Repository;

  })();

  exports.Repository = Repository;

}).call(this);