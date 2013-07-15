class Repository
	constructor: (database, @objectName) ->
		@db = require("mongojs").connect(database, [@objectName])
	add: (value, callback) ->
		@db[@objectName].save(value,callback)
	find: (query, callback) ->
		@db[@objectName].find(query, (err, docs) -> callback(docs))
	update: (query, value) ->
		@db[@objectName].update(query, {$set: value}, {multi: true})
	remove: (query) ->
		@db[@objectName].remove(query)
		
exports.Repository = Repository