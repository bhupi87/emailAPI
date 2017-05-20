var express = require("express"),
	config = require('config'),
	async  = require("async");
var mailGunAPI = config.get('Provider.mailGun.apiKey');
var mailGunDomain = config.get('Provider.mailGun.domain');


var mailer = {};


mailer.manageSendEmail = function(req, callback){
	
	console.log('manage send email with multiple platform');
	
	
	/* var mailgun = require('mailgun-js')({
	  apiKey: mailGunAPI, 
	  domain: mailGunDomain});
   
	  var data = {
		from: 'Bhupendra Mail Gun <postmaster@sandboxdomain.mailgun.org>', //replace with your SMTP Login ID
		to: req.body.userName, // enter email Id to which email notification has to come. 
		subject: req.body.userName+" Sent you a message", //Subject Line
		html: "<b style='color:green'>Message: </b>"+req.body.body //Subject Body
	  };*/
	  
	  async.waterfall([
			async.apply(sendViaMailgunEmail, req), //manage send grig mail
						sendViaMandrillEmail,
						sendViaSendGridEmail,
						sendViaAwsProvider
		], function(err, result){
			console.log(err, result);
			if(err){
				if(err.success){
					callback({success: true, info: "E mail has been sent successfully"});
				} else {

					callback({success: false, info: "there are issue on third party mailer"});
				}
			} else {
				callback({success: true, info: "E mail has been sent successfully"});
			}
		}) 
  
}

var sendViaMailgunEmail = function(req, callback){
	
	 var mailgun = require('mailgun-js')({
	  apiKey: mailGunAPI, 
	  domain: mailGunDomain});
	   var data = {
		from: 'Bhupendra Mail Gun <postmaster@sandboxdomain.mailgun.org>', 
		to: req.body.userName,  
		subject: req.body.userName+" Sent you a message", 
		html: "<b style='color:green'>Message: </b>"+req.body.body 
	  };
	  
	   mailgun.messages().send(data, function (error, response) {		
		if(!error){		
		  callback({success: true})
		}
		else{
		  callback(null, req);		  
		}		
	  });
	
}

//send email via mandrill
var sendViaMandrillEmail = function(req, callback){
	console.log('send mail sendViaMandrillEmail');
	//callback({success: true})
	 callback(null, req);
}

//send email via sendViaSendGridEmail
var sendViaSendGridEmail = function(req, callback){
	console.log('send mail sendViaSendGridEmail');
	callback(null, req);
}

//send email via sendViaAwsProvider
var sendViaAwsProvider = function(req, callback){
	console.log('send mail sendViaAwsProvider');
	callback(null, req);
}

module.exports = mailer;

	
