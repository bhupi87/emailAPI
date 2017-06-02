var config = require('config')
var validator = require('email-validator')
var async = require('async')
var mailer = {}

/* Method which initiate
*  mail processing
*/
mailer.manageSendEmail = function (req, callback) {
  if (validator.validate(req.body.emailID)) {
    async.waterfall([
      async.apply(sendViaMailgunEmail, req),
      sendViaSendGridEmail],
  function (err, result) {
    if (err) {
      if (err.success) {
        callback({success: true, info: 'E mail has been sent successfully'})
      } else { callback({success: false, info: 'There are issue on third party mailer'}) }
    } else {
      callback({success: true, info: 'E mail has been sent successfully'})
    }
  })
  } else { callback({success: false, info: 'Please enter valid email id '}) }
}

/* This method is sending mail
*  via mailGun API
*/

var sendViaMailgunEmail = function (req, callback) {
  var mailGunAPI = config.get('Provider.mailGun.apiKey')
  var mailGunDomain = config.get('Provider.mailGun.domain')
  var mailgun = require('mailgun-js')({ apiKey: mailGunAPI, domain: mailGunDomain })
  var data = {
    from: 'Bhupendra Mail Gun <postmaster@sandboxdomain.mailgun.org>',
    to: req.body.emailID,
    subject: req.body.emailID + ' Sent you a message',
    html: "<b style='color:green'>Message: </b>" + req.body.body }
  mailgun.messages().send(data, function (error, response) {
    if (!error) {
      console.log('Mail Send .....')
      callback({success: true})
    } else { callback(null, req) }
  })
}

/* This method is sending mail
*  via sendGrid API
*/
var sendViaSendGridEmail = function (req, callback) {
  var sendGridAPI = config.get('Provider.sendGrid.apiKey')
  var sendgrid = require('sendgrid')(sendGridAPI)
  var request = sendgrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [{
        to: [{ email: req.body.emailID }],
        subject: 'Bhupendra Sendgrid Mail'
      }],
      from: { email: 'bhupi87@gmail.com' },
      content: [{
        type: 'text/plain',
        value: req.body.body }]
    }})
  sendgrid.API(request, function (error, response) {
    if (response.statusCode === 202) {
      console.log('Mail Send .....')
      callback({success: true})
    } else { callback(null, req) }
  })
}
module.exports = mailer
