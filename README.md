# Jeopardy API with LoopBack and MongoDB

### An example repo to demonstrate how to set up an easy API with LoopBack, MongoDB, and IBM's Bluemix.

##### Local Development

You will need:
1. Node (version 6.6 or higher)
2. NPM (version 3.10 or higher)
3. LoopBack cli 
		`npm install -g loopback-cli`
4. MongoDB (3.4: installation instructions [here](https://docs.mongodb.com/manual/installation/))

##### Bluemix Deployment

1. Bluemix Account (sign up [here](https://console.ng.bluemix.net/registration/))
2. Bluemix CLI (download and installation instructions [here](https://console.ng.bluemix.net/docs/cli/reference/bluemix_cli/index.html#getting-started))

##### Data
The Jeopardy! dataset (216,930 Jeopardy! questions in JSON format) is available [here](https://flowingdata.com/2014/11/07/jeopardy-clues-data/). Thanks so much to the great [*Data is Plural*](https://tinyletter.com/data-is-plural) tinyletter for finding and sharing so many interesting datasets!  

* Hint: If you want to do date search in Mongo with this dataset, you will need to convert the dates to a Date format. You can do this  once your data has been loaded in Mongo with a shell command like this: `db.jeopardy.find().forEach(function(doc){doc.air_date = new ISODate(doc.air_date);db.jeopardy.save(doc)})`

### Create Your API

##### Start Mongo
Start Mongo locally and load your data into your local MongoDB. (Your process will vary, but you could use something like `mongoimport  --db test --collection jeopardy --file JEOPARDY_QUESTIONS.txt`

##### Time for LoopBack! 

To create your LoopBack application, use 
`lb app jeopardy-mongo-api`

![Loopback init](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/Loopback1.png)

![Loopback app creation](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/Loopback2.png)

Wait for `npm install` to finish, then `cd jeopardy-mongo-api`

##### Add your datasource! 

`lb datasource`

Name your datasource and choose the LoopBack MongoDB connector: 

![Loopback datasource 2](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/LoopBack-datasource2.png)

If you use a URL for your connector you don't need to specify the host/port/user/password: 

![Loopback datasource 2](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/LoopBack-datasource3.png)

Wait for `npm install` of the connector to finish. 

##### Create your model!

`lb model`

The schema for the Jeopardy! questions is 
```json{
	"_id" : ObjectId("5922063e8f51a16a884263bf"),
	"category" : "HISTORY",
	"air_date" : "2004-12-31",
	"question" : "'For the last 8 years of his life, Galileo was under house arrest for espousing this man's theory'",
	"value" : "$200",
	"answer" : "Copernicus",
	"round" : "Jeopardy!",
	"show_number" : "4680"
}
```

Name your model and connect it to the datasource you just created: 
![LoopBack model](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/LoopBack-model.png)

You probably won't be saving new questions to the database but you can just go ahead and select PersistedModel just in case: 

![LoopBack model](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/LoopBack-model2.png)

You don't need to create a property specifically for '_id'; LoopBack will do it for you:

![LoopBack model](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/LoopBack-model3.png)

##### Start your API!

`node .`

![LoopBack start](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/LoopBack-start.png)

##### Check out the Explorer!

![LoopBack explorer](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/LoopBack-explorer.png)

... 

![LoopBack explorer 2](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/LoopBack-explorer2.png)

...

![LoopBack explorer 3](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/LoopBack-explorer3.png)

##### Create custom endpoints

A. Get a random question: 

In the `common/models/jeopardy-question.js` file, add the endpoint functionality:

````	
Jeopardyquestion.random = function(cb){
	Jeopardyquestion.getDataSource().connector.connect(function(err, db) {
		  var collection = db.collection('jeopardyQuestion');
		  collection.aggregate([
		    { $sample: { size: 1 } }
		  ], function(err, data) {
		    if (err) return cb(err);
		    return cb(null, data);
		  });
		});
	}
````
and the endpoint description:

````
	Jeopardyquestion.remoteMethod(
		'random', {
			http: {
				path: '/random',
				verb: 'get'
			},
			description: 'Gets one random question',
			returns: {
				arg: 'questions',
				type: 'json'
			}
		});
````		

B. Get the entire list of Jeopardy! categories: 

In the `common/models/jeopardy-question.js` file, add the endpoint functionality:

````	
Jeopardyquestion.categories = function(cb){
		Jeopardyquestion.getDataSource().connector.connect(function(err, db) {
		  var collection = db.collection('jeopardyQuestion');
		  collection.distinct('category', function(err, data) {
		    if (err) return cb(err);
		    return cb(null, data);
		  });
		});
	}
````
and the endpoint description:

````
	Jeopardyquestion.remoteMethod(
		'categories', {
			http: {
				path: '/categories',
				verb: 'get'
			},
			description: 'Gets list of categories',
			returns: {
				arg: 'categories',
				type: 'json'
			}
		});
````		

Restart your application, and you should now see these endpoints in your Explorer: 

