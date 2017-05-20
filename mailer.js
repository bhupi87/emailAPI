var express = require("express"),
	config = require('config'),
	validator = require("email-validator"),
	async  = require("async");

var mailer = {};

/* Method which initiate mail processing
* 
*/
mailer.manageSendEmail = function(req, callback){
	
	console.log('manage send email with multiple platform');
      if(validator.validate(req.body.emailID)){
	  async.waterfall([
			async.apply(sendViaMailgunEmail, req), 
						sendViaSendGridEmail,
						sendViaMandrillEmail,
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
   else
		callback({success: false, info: "Please enter valid email id "});
}

/* This method is sending mail
*  via mailGun API
*/

var sendViaMailgunEmail = function(req, callback){	
	
	var mailGunAPI = config.get('Provider.mailGun.apiKey');
	var mailGunDomain = config.get('Provider.mailGun.domain');	
	var mailgun = require('mailgun-js')({
	  apiKey: mailGunAPI, 
	  domain: mailGunDomain});
	   var data = {
		from: 'Bhupendra Mail Gun <postmaster@sandboxdomain.mailgun.org>', 
		to: req.body.emailID,  
		subject: req.body.emailID+" Sent you a message", 
		html: "<b style='color:green'>Message: </b>"+req.body.body 
	  };
	  
	   mailgun.messages().send(data, function (error, response) {		
		if(!error){	
           console.log("Sending mail via MailGun api .....");		
		  callback({success: true})
		}
		else{
		  callback(null, req);		  
		}		
	  });
	
}

/* This method is sending mail
*  via sendGrid API
*/
var sendViaSendGridEmail = function(req, callback){
	var sendGridAPI = config.get('Provider.sendGrid.apiKey');
	console.log("Sendgrid API-KEY "+sendGridAPI);
	var sendgrid = require("sendgrid")(sendGridAPI);
	var request = sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
	body: {
		personalizations: [
		  {
			to: [
			  {
				email: req.body.emailID
			  }
			],
			subject: "Bhupendra Sendgrid Mail" 
		  }
		],
		from: {
		  email: 'bhupi87@gmail.com'
		},
		content: [
		  {
			type: 'text/plain',
			value: req.body.body
		  }
		]
	  }
  });

  sendgrid.API(request, function(error, response) {
	
    if(response.statusCode === 202){
    	console.log("Sending mail via sendgrid api .....");
    	callback({success: true})
    } else {
    	console.log('Needs to be sent to other mail service provider');
    	callback(null, req);
    }
    
  })
	
}

/* This method is sending mail
*  via manDrill API
*/
var sendViaMandrillEmail = function(req, callback){
	console.log('send mail sendViaSendGridEmail');
	callback(null, req);
}

/* This method is sending mail
*  via awsAPI API
*/
var sendViaAwsProvider = function(req, callback){
	console.log('send mail sendViaAwsProvider');
	callback({success: true})
}

module.exports = mailer;

	
