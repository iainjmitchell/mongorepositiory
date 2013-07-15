var assert = require('assert'),
	Repository = require('../lib/repository').Repository,
	mongoConnectionString = 'mongodb://username:password@host';

test('Test add a cat to the db and can retrieve it.',function(){
	var catRepository = new Repository(mongoConnectionString, 'cat'),
		catName = 'trevor',
		query = {name: catName}
	
	var cat = {
		  name: catName
		}
	catRepository.remove(cat);
	catRepository.add(cat);

	catRepository.find(query, function(results){
	  assert.equal(results[0].name,cat.name);
	});
});


test('Test add uses callback after cat written to database',function(done){
	var catRepository = new Repository(mongoConnectionString, 'cat'),
		catName = 'trevor',
		query = {name: catName}

	var cat = {
		  name: catName
	}

	catRepository.remove(cat);
	
	catRepository.add(cat,function(){
		catRepository.find(query, function(results){
			assert.equal(results[0].name,cat.name);
			done();
		});
	});

	
});