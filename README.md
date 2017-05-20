# Email API Application

A simple app which send email notification , this api also contain simple UI to enter email id and mail content . Currently This api is using MailGun 
as primary provider and SendGrid and secondary . If MailGun server is down , api will switch to SendGrid server to send mail .

## How to use

Open a command window in your project folder.

Run npm install to install all the dependencies in the package.json file.

Run node index.js to start the server.  (Hit CTRL-C to stop.)

```
> npm install
> node index.js
```

Point your browser to http://localhost:3000. It will open a UI , click on "Click here To Send Email Button" to send email .
Enter email Id and Content in box provided by UI and click on send button .

To Test this api using postman : Use below url and post json data in below format : http://localhost:3000/contact
JSON Data Format :
{ "emailID" : "bhupi87@gmail.com", "body" : " This is through postman" }
