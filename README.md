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

1. Start Mongo locally and load your data into your local MongoDB. (Your process will vary, but you could use something like `mongoimport  --db test --collection jeopardy --file JEOPARDY_QUESTIONS.txt`
2. Time for LoopBack! 

To create your LoopBack application, use 
`lb app jeopardy-mongo-api`

![Loopback init](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/Loopback1.png)

![Loopback app creation](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/Loopback2.png)

Wait for `npm install` to finish, then `cd jeopardy-mongo-api`

3. Add your datasource! 

`lb datasource`
![Loopback datasource 1](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/LoopBack-datasource.png)

Choose the LoopBack MongoDB connector: 

![Loopback datasource 2](https://github.com/emckean/jeopardy-mongo-api/blob/master/readme:images/LoopBack-datasource2.png)