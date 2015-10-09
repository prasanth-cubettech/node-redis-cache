var express = require('express');
var app = express();
var redis = require("redis"),
    client = redis.createClient();

//Express call
app.get('/', function (req, res) {
	//Checking for key exist
	client.exists('some_key', function(err, exist) {
		if(err) console.log(err);
		if(exist) {
			//Get cached data
			client.get('some_key', function(err, result) {
				res.send('Cached data! :- some_key : ' + result);
			});
		} else {
			//Set data to redis
			client.set('some_key','some_value', redis.print);
			//Set expire for key
			client.expire('some_key',10);
			res.send('Not cached! :- some_key : some_value');
		}
	});
});

//Server running on portal
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Node redis cache app listening at http://%s:%s', host, port);
});