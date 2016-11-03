var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {

	//inputarray
	var inputarray = new Array();

	//totla
	var total = '';

	//filename
	var filename = 'simulation2_result.csv';

	//name
	var name = '';

	//IP address
	var IP_str = fs.readFileSync('ddas.conf', 'utf8');
	var IP_array = new Array();
	IP_array = IP_str.split("\n");

	var IP_num = IP_array[0].indexOf("=");
	var IP = IP_array[0].substring(IP_num+1, IP_array[0].length-1);

	var IP_metadata = 'mongodb://' + IP + '/metadata';
	var IP_simulation = 'mongodb://' + IP + '/simulation';


	//metadata database connect
  	client.connect(IP_metadata, function(err,db){

  		//simulation2 collection connect
		db.collection('simulation2').find().toArray(function(err, result){
			
			//simulator name
			name = result[0].simulator.name;

			//inputarray 
			for(var i in result[0].input){

				inputarray[i] = JSON.stringify(result[0].input[i].name);
				inputarray[i] = inputarray[i].substring(1,inputarray[i].length-1);
				//1개를 뺌

			}
	
		})

	})

  	//simulation database connect
	client.connect(IP_simulation, function(err,db){

		//simulation2 collection connect
		db.collection('simulation2').find().toArray(function(err, result){

			//total 상단 
			total += "aa,bb,cc,dd,ee,aa,bb,cc,dd,ee\n";

			//result 
			for(var i in result){
				
				//aa
				total += result[i].input.aa + ",";

				//bb
				total += result[i].input.bb + ",";

				//cc
				total += result[i].input.cc + ",";

				//dd
				total += result[i].input.dd + ",";

				//ee
				total += result[i].input.ee + ",";

				//aa
				total += result[i].output.aa + ",";

				//bb
				total += result[i].output.bb + ",";

				//cc
				total += result[i].output.cc + ",";

				//dd
				total += result[i].output.dd + ",";
				
				//ee
				total += result[i].output.ee;
				
				//줄바꿈
				total += "\n";
				
			}

			//csv file write
			fs.writeFileSync('./simulation2_result.csv', total, 'utf-8');

			//name, inputarray, filename render
			res.render('simulation2_input',{ title: '시뮬레이션 서비스 시스템', name:name, items:inputarray, filename:filename});

		})

		

	})


});

module.exports = router;
