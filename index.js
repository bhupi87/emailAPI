var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
//var config = require('config');
var mailer = require('./mailer.js');

var app = express();  // make express app
var server = require('http').createServer(app);
/*var mailGunAPI = config.get('Provider.mailGun.apiKey');
var mailGunDomain = config.get('Provider.mailGun.domain');*/

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
// GETS
app.get("/", function(req,res){
	res.render("index");
});

app.get("/contact", function(req,res){
	res.render("contact");
});
// ENd of GET request handling

// POSTS
app.post("/contact",function(req,res){
	
	mailer.manageSendEmail(req, function(result){
		res.send(result);
	});
	
	//mailer.sendViaMailgunEmail(req,res);   

});


server.listen(3000, function () {
  console.log('Nodejs app listening on http://127.0.0.1:3000/');
});

