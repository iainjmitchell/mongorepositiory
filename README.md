# mongorepository
A [node.js](http://nodejs.org/) module that contains a generic implementation of the [Repository Pattern](http://martinfowler.com/eaaCatalog/repository.html) for [mongoDB](http://www.mongodb.org/).

### Installation
The easiest way to install is through the Node Package Manager ([NPM](http://npmjs.org/)):

``` js
npm install mongorepository
```

### Usage
``` js 
//reference the repository object
var Repository = require('mongoRepository').Repository;

//create an instance
var catRepository = new Repository('username:password@localhost/dbname', 'cat');

var cat = {
  _id : 101,
  name: 'trevor'
}

//add cat
catRepository.add(cat);

//get cat by id
catRepository.get(101, function(returnedCat){
	console.log(returnedCat);
});

//find cat
query = {name: 'trevor'}
catRepository.find(query, function(results){
  console.log(results);
});

//update cat
cat.age = 4;
catRepository.update(query, cat);

//delete cat
catRepository.remove(query,function(){
	console.log("Removed ",cat);
});
```