var express = require('express');
var router = express.Router();
var fs = require('fs');
var exec = require('child_process').exec, child;
var client = require('mongodb').MongoClient;

//GET
router.get('/', function(req, res, next) {

	//name
	var name = '';

	//outputarray
	var outputarray = new Array();

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
			
		//kflow collection connect
		db.collection("kflow").find().toArray(function(err, result){

			//simulator name assign
			name = result[0].simulator.name;		

			//ourputarray
			for(var i in result[0].output){

				outputarray[i] = JSON.stringify(result[0].output[i].name);
				outputarray[i] = outputarray[i].substring(1,outputarray[i].length-1);
				//1개를 뺌

			}
		})
		
	})

	//jar 파일 연결
	//predictor connect
	//child = exec('java -jar C:\\Coding\\Simulation_DataSearch\\Predict_Test_fat.jar', function(err,stdout,stderr){
	child = exec('java -jar .\\Simulation_Predictor_fat.jar', function(err,stdout,stderr){
	
		//error o
		if(err)
			console.log(err.code);
		//console.log(stdout);

		//stdout
		var std = stdout;

		//standard array
		var standard = new Array();
		
		//줄바꿈으로 split
		standard = std.split("\n");
		//console.log(standard);

		//substring
		for(var i=0; i<standard.length - 2; i++)
			standard[i] = standard[i].substring(3);

		//outputarray, standard, name render
		res.render('kflow_test',{outputarray:outputarray, standard:standard, name:name});
	})

});

module.exports = router;
