# Email API Application

## Problem Description :

Create a RESTful API that accepts the necessary information and sends emails using email provider . Conifigure multiple email provider
so that can support failover situation .

## Approach :

Using callback algorith to handle failover situation , also using CONFIG JS framwork to store email provider detail in json framwork and loading 
this data at run time during request .

A simple app which send email notification , this api also contain simple UI to enter email id and mail content . Currently This api is using MailGun 
as primary provider and SendGrid and secondary . If MailGun server is down , api will switch to SendGrid server to send mail .

## Running Locally 

Make sure you have Node.js . Open a command window in your project folder .

Clone project in your local environment and run mail-api using below command
```sh
git clone https://github.com/bhupi87/emailapi.git
cd emailapi
git checkout develop
npm start
```

## Testing Steps :

Point your browser to http://localhost:3000. It will open a UI , click on "Click here To Send Email Button" to send email .
Enter email Id and Content in box provided by UI and click on send button .

To Test this api using postman : Use below url and post json data in below format : http://localhost:3000/contact
JSON Data Format :
{ "emailID" : "bhupi87@gmail.com", "body" : " This is through postman" }
