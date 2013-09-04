var assert = require('assert'),
	Repository = require('../lib/repository').Repository,
	mongoConnectionString = 'mongodb://username:password@host'; 

test('Test can remove a cat from the db',function(done){
	var catRepository = new Repository(mongoConnectionString, 'cat'),
		catName = 'trevor',
		query = {name: catName}
	
	var cat = {
			name: catName
		};

	catRepository.add(cat,function(){
		catRepository.remove({name: catName},function(){
			catRepository.find(cat, function(results){
		 		assert.equal(results.length,0);
		 		done();
			});
		});	
	});
});