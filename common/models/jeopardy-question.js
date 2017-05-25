'use strict';

module.exports = function(Jeopardyquestion) {

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

	Jeopardyquestion.categories = function(cb){
		Jeopardyquestion.getDataSource().connector.connect(function(err, db) {
		  var collection = db.collection('jeopardyQuestion');
		  collection.distinct('category', function(err, data) {
		    if (err) return cb(err);
		    return cb(null, data);
		  });
		});
	}

	

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

};
