var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

	//매개변수 array
	var array = new Array();

	//IP address
	var IP_str = fs.readFileSync('ddas.conf', 'utf8');
	var IP_array = new Array();
	IP_array = IP_str.split("\n");

	var IP_num = IP_array[0].indexOf("=");
	var IP = IP_array[0].substring(IP_num+1, IP_array[0].length-1);

	var IP_metadata = 'mongodb://' + IP + '/metadata';
	var IP_simulation = 'mongodb://' + IP + '/simulation';

	

	//metadata접속
	client.connect(IP_metadata, function(err,db){

		//kflow collection connect
		db.collection('kflow').find().nextObject(function(err, result){ 

			//array push
			array.push(result.simulator.name); 

		})

		//simulation2 collection connect
		db.collection('simulation2').find().nextObject(function(err,result){ 

			//array push
			array.push(result.simulator.name); 

		})

		//simulation3 collection connect
		db.collection('simulation3').find().nextObject(function(err,result){

			//array push
			array.push(result.simulator.name); 

			//render title, array
			res.render('home', { title: '시뮬레이션 서비스 시스템' ,array:array});
			
		})		

	})
	
  	
});

module.exports = router;
