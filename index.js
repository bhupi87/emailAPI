var path = require("path");
	express = require("express"),
	logger = require("morgan"),
	bodyParser = require("body-parser");

var mailer = require('./mailer.js');

var app = express();  // make express app
var server = require('http').createServer(app);


// set up the view engine
app.set("views", path.resolve(__dirname, "views")); // path to views
app.set('view engine', 'ejs');
// End of view engine setup

// set up the logger 
//only log error responses
app.use(logger("dev"));

// End of logger

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname+'/assets/')));

// Handle GET request
app.get("/", function(req,res){
	res.render("index");
});

app.get("/contact", function(req,res){
	res.render("contact");
});

// ENd of GET request handling

// Handle POST request
app.post("/contact",function(req,res){	
	mailer.manageSendEmail(req, function(result){
		res.send(result);
	}); 

});


server.listen(3000, function () {
  console.log('Nodejs app listening on http://localhost:3000/');
});

