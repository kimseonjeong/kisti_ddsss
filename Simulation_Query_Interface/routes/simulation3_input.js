var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {

	//inputarray
	var inputarray = new Array();

	//total string
	var total = '';

	//filename
	var filename = 'simulation3_result.csv';

	//name string
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

  		//simulation3 collection connect
		db.collection('simulation3').find().toArray(function(err, result){
			
			//simulator name
			name = result[0].simulator.name;

			//input array
			for(var i in result[0].input){

				inputarray[i] = JSON.stringify(result[0].input[i].name);
				inputarray[i] = inputarray[i].substring(1,inputarray[i].length-1);
				//1개를 뺌

			}
	
		})

	})

  	//simulation database connect
	client.connect(IP_simulation, function(err,db){

		//simulation3 collection connect		
		db.collection('simulation3').find().toArray(function(err, result){

			//total 상단
			total += "AA,BB,CC,DD,EE,AA,BB,CC,DD,EE\n";

			//result
			for(var i in result){
				
				//AA
				total += result[i].input.AA + ",";

				//BB
				total += result[i].input.BB + ",";

				//CC
				total += result[i].input.CC + ",";

				//DD
				total += result[i].input.DD + ",";

				//EE
				total += result[i].input.EE + ",";

				//AA
				total += result[i].output.AA + ",";

				//BB
				total += result[i].output.BB + ",";

				//CC
				total += result[i].output.CC + ",";

				//DD
				total += result[i].output.DD + ",";
				
				//EE
				total += result[i].output.EE;
				
				//쭐빠굼
				total += "\n";
				
			}

			//CSV FILE WRITE
			fs.writeFileSync('./simulation3_result.csv', total, 'utf-8');

			//NAME, INPUTARRAY, FILENAME RENDER
			res.render('simulation3_input',{ title: '시뮬레이션 서비스 시스템', name:name, items:inputarray, filename:filename});

		})

		

	})


});

module.exports = router;
