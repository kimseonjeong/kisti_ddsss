var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;

//POST
router.post('/',function(req,res,next){

	//name string
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
		
		//simulation3 collection connect
		db.collection("simulation3").find().toArray(function(err, result){

			//simulator name
			name = result[0].simulator.name;	

			//output
			for(var i in result[0].output){

				outputarray[i] = JSON.stringify(result[0].output[i].name);
				outputarray[i] = outputarray[i].substring(1,outputarray[i].length-1);
				//1개를 뺌

			}	

		})
		
	})
	
	//simulation database connect
	client.connect(IP_simulation, function(err,db){

		//result string
		var result = "";
		
		//query
		var query = {};

		//if aa
		if (req.body.aa != "")
		{

			//aa query
			query['input.aa']=req.body.aa;

		}

		//if bb
		if (req.body.bb != "")
		{

			//bb query
			query['input.bb']=req.body.bb;

		}

		//if cc
		if (req.body.cc != "")
		{

			//cc query
			query['input.cc']=req.body.cc;

		}

		//if dd
		if (req.body.dd != "")
		{

			//dd query
			query['input.dd']=req.body.dd;

		}

		//if ee
		if (req.body.ee != "")
		{

			//ee query
			query['input.ee']=req.body.ee;

		}
		
		//simulation collection query
		var cursor = db.collection("simulation3").find(query);

		//query find
		cursor.nextObject(function(err, items){

			//item, outputarray, name render
			res.render('simulation3_output',{items:items, outputarray:outputarray, name:name});

		})
		
	})

});


module.exports = router;
