var assert = require('assert'),
	Repository = require('../lib/repository').Repository;

test('Test add a cat to the db and can retrieve it.',function(){
	var catRepository = new Repository('mongodb://allegronetworks:AllegroNetworks@ds035338.mongolab.com:35338/heroku_app16418887', 'cat');

	var catName = 'trevor';

	query = {name: catName}
	
	var cat = {
		  name: catName
		}
	catRepository.remove(cat);
	catRepository.add(cat);

	catRepository.find(query, function(results){
	  assert.equal(results[0],cat);
	});
	
});