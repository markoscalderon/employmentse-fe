
var width = 960,
  height = 500;

var projection = d3.geo.mercator()
  .center([0, 5 ])
  .scale(200);

var svg = d3.select("#map").append("svg")
  .attr("width", width)
  .attr("height", height);

var path = d3.geo.path()
  .projection(projection);

var g = svg.append("g");

var jsonArray;
// Get JSON-like array with {latitude, longitude, color}
$.getJSON("/data/json",function(result){jsonArray=result;});

//display slider
// d3.select("#slider9").call(d3.slider().value( [10, 30]).orientation("vertical"));

var dateArray=[ "2012/01","2012/02","2012/03","2012/04",
                "2012/05","2012/06","2012/07","2012/08",
                "2012/09","2012/10","2012/11","2012/12",
                "2013/01","2013/02","2013/03","2013/04",
                "2013/05","2013/06","2013/07","2013/08",
                "2013/09","2013/10","2013/11","2013/12",
                "2014/01","2014/02"];

var startDate = "2012-01";
var endDate = "2013-01"
$(function() 
{
    $( "#slider9" ).slider({
      orientation: "vertical",
      range: true,
      values: [0, 50],
      slide: function( event, ui ) 
      {
        startDate = dateArray[Math.floor(ui.values[0]/4)].replace("/","-") + "-01";
        endDate = dateArray[Math.floor(ui.values[1]/4)].replace("/","-") + "-01";
        
        $( "#startDate" ).text(dateArray[Math.floor(ui.values[0]/4)]);
        $( "#endDate" ).text(dateArray[Math.floor(ui.values[1]/4)]);
        // console.log(dateArray[Math.floor(ui.values[0]/4)]);
        // console.log(dateArray[Math.floor(ui.values[1]/4)]);
        mapit();
      }
    });
  });


// load and display the World
d3.json("/geodata/json/world-110m2.json", function(error, topology) {

// load and display the cities
/*d3.json("/data/json", function(error, data) {
  console.log(data);
    g.selectAll("circle")
       .data(data)
       .enter()
       .append("a")
          .attr("xlink:href", function(d) {
            return "https://www.google.com/search?q="+d.city;}
          )
       .append("circle")
       .attr("cx", function(d) {
               return projection([d.lon, d.lat])[0];
       })
       .attr("cy", function(d) {
               return projection([d.lon, d.lat])[1];
       })
       .attr("fill-opacity", 0.5)
       .attr("r", 3)
       .style("fill", function(d) {
          return d.color; 
       });
});*/

	g.selectAll("path")
	  .data(topojson.object(topology, topology.objects.countries)
	    .geometries)
	  .enter()
	  .append("path")
	  .attr("d", path)
});

// zoom and pan
var zoom = d3.behavior.zoom()
  .on("zoom",function() {
      g.attr("transform","translate("+ 
          d3.event.translate.join(",")+")scale("+d3.event.scale+")");
      g.selectAll("circle")
          .attr("d", path.projection(projection));
      g.selectAll("path")  
          .attr("d", path.projection(projection)); 

});

svg.call(zoom);

function mapit()
{
  var filteredArray = jsonArray.filter(function(obj) 
  {
    return ((new Date(startDate) < new Date(obj.date)) &&  (new Date(obj.date) < new Date(endDate)));

    // (obj.name === "Joe") && (obj.age < 30);
  });
  console.log(filteredArray.length);

  g.selectAll("circle").remove();

  g.selectAll("circle")
    .data(filteredArray)
    .enter()
    .append("a")
    .attr("xlink:href", function(d) {return "https://www.google.com/search?q="+d.city;})
    .append("circle")
    .attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
    .attr("cy", function(d) {return projection([d.lon, d.lat])[1];})
    .attr("fill-opacity", 0.5)
    .attr("r", 3)
    .style("fill", function(d) {return d.color;});
}