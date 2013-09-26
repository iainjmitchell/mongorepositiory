var should = require('chai').should(),
	MongoRepository = require('../lib/repository').Repository;

describe('When we want to keep track of cats', function(){
	var connectionString = 'mongodb://mongorepository:manky@paulo.mongohq.com:10051/mongorepositorytest',
		mongoRepository = new MongoRepository(connectionString, 'cat');

	describe('When I have no cats', function(){
		describe('And I try to find all cats', function(){
			it('Then no cats are returned :(', function(done){
				mongoRepository.find({}, function(cats){
					cats.length.should.equal(0);
					done();
				});
			});
		});
	});

	describe('When I add tom cat', function(){
		var tomCat = {name: 'TomCat'};
		it('Then the callback is triggered', function(done){
			mongoRepository.add(tomCat, done);
		});

		describe('And I try to find tom cat', function(){
			it('Then one cat is returned :)', function(done){
				mongoRepository.find(tomCat, function(cats){
					cats.length.should.equal(1);
					done();
				});
			});

			describe('And I update tom cat to include age', function(){
				describe('And I try to find tom cat', function(){
					it('Then cat returned includes age :{', function(done){
						var age = 10;
						mongoRepository.update(tomCat, {name: 'TomCat', age: age});
						mongoRepository.find(tomCat, function(cats){
							cats[0].age.should.equal(age);
							done();
						});
					});
				});
			});

			describe('And I remove tom cat', function(){
				describe('And I try to find tom cat', function(){
					it('Then no cats are returned :(', function(done){
						mongoRepository.remove(tomCat);
						mongoRepository.find(tomCat, function(cats){
							cats.length.should.equal(0);
							done();
						});
					});
				});
			});
		});

		describe('When I add a whole host of kitties', function(){
			before(function(){
				mongoRepository.add({name : 'paul', age: 1});
				mongoRepository.add({name : 'ringo', age: 10});
				mongoRepository.add({name : 'george', age: 1});
				mongoRepository.add({name : 'john', age: 10});
				mongoRepository.add({name : 'blah', age: 10});
			});

			describe('And I try to find all the cats with age of 10', function(){
				it('Then I only get the cats with an age of 10', function(done){
					mongoRepository.find({age : 10}, function(cats){
						cats.length.should.equal(3);
						done();
					});
				});

				describe('And I remove all cats', function(){
					describe('And I try to find all cats', function(){
						it('Then no cats are returned :(', function(done){
							mongoRepository.remove({});
							mongoRepository.find({}, function(cats){
								cats.length.should.equal(0);
								done();
							});
						});
					});
				});
			});
		});
	});

	describe('When I have a cat with an _id', function(){
		var _id = '101',
			bagpuss = {
				_id : _id,
			};
		
		before(function(done){
			mongoRepository.add(bagpuss, done);
		});

		describe('When I get the cat by _id', function(){
			it('Then my cat is returned', function(done){
				mongoRepository.get(_id, function(cat){
					console.log(cat);
					cat.should.eql(bagpuss);
					done();
				});
			});
		});

		after(function(){
			mongoRepository.remove({});
		});
	});
});