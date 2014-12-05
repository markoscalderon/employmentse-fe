var express = require('express');
var router = express.Router();
var solr = require('solr-client');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'EmploymentSE Dashboard' });
});

/* GET home page. */
router.get('/bubble', function(req, res) {
  res.render('base', { title: 'EmploymentSE Dashboard' });
});

/* GET json data. */
router.get('/data/json', function(req, res) {
  
  //send json data


var client = solr.createClient({
      host : "localhost",
      port : 8989
   });

	client.search('q=*%3A*&rows=250000', function(err, obj)
	// client.search('q=*%3A*&wt=json&indent=true&group.field=Company&group=true&rows=5000', function(err, obj)
    {
        var results = obj['response']['docs'];
        // var results = obj['grouped']['Company']['groups'];

        var toReturn = []; 
        results.forEach(function(result) 
        {    		
        	var job = {};
			job["lon"] = result["Longitude"];
			job["lat"] = result["Latitude"];
			// job["company"] = result["groupValue"]
			// job["numFound"] = result["doclist"]["numFound"]
			
			switch (result["Company"])
			{
				case "Adecco Argentina S.A.": 	job["color"] = "red"; 	break;
				case "Manpower": 				job["color"] = "green"; break;
				case "Manpower Seleccion": 		job["color"] = "green"; break;
				case "Guía Laboral SRL": 		job["color"] = "blue"; 	break;
				case "SENSI s.r.l.": 			job["color"] = "yellow"; break;
				case "Sensi s.r.l.": 			job["color"] = "yellow"; break;
				case "Grupo Gestión": 			job["color"] = "fuchsia"; break;
				case "Randstad": 				job["color"] = "aqua"; break;
				case "Solución Eventual": 		job["color"] = "maroon"; break;
				case "Kaizen Recursos Humanos": job["color"] = "olive"; break;
				case "Capital Humano": 			job["color"] = "purple"; break;	
				case "Consultora TGA": 			job["color"] = "teal"; break;	
				default: 						job["color"] = "black"; break;			
			}
			// if (result["Company"] == "Adecco Argentina S.A.") {job["color"] = "red"}


			// if (mode == jobType) {
			// 	job["color"] = mapToColor(result["jobType"]);	
			// } else if (mode == location) {
			// 	job["color"] = mapToLocation(result["location"]);
			// }
			if (job["color"] != "black")
			{
				toReturn.push(job);
			}
		});

        // var compare = function(a,b){if(a.numFound < b.numFound) return 1; else if(a.numFound > b.numFound) return -1; return 0; };
        // toReturn.sort(compare);
        console.log(toReturn);
		res.json(toReturn);
    });


  // var data = [	{"code":"ECU","city":"QUITO","country":"EQUADOR","lat":"-2.24503", "lon":"-79.90723"},
  // 				{"code":"TYO","city":"TOKYO","country":"JAPAN","lat":"35.68","lon":"139.76"}	]

  
});


module.exports = router;
