# Email API Application

## Problem Description :

Create a RESTful API that accepts the necessary information and sends emails using email provider . Conifigure multiple email provider
so that can support failover situation .

## Approach :

Using callback algorith to handle failover situation , also using CONFIG JS framwork to store email provider detail in json framwork and loading 
this data at run time during request .

A simple app which send email notification , this api also contain simple UI to enter email id and mail content . Currently This api is using MailGun 
as primary provider and SendGrid and secondary . If MailGun server is down , api will switch to SendGrid server to send mail .

## Prerequisites

Make sure you have installed all of the following prerequisites on your  machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MailGun API-Key  - [Sign-up & Create Account]https://www.mailgun.com/) 
* SendGrid API-Key  - [Sign-up & Create Account]https://sendgrid.com/) 

## How to run 

Make sure you have Node.js . Open a command window in your project folder .

1. Clone this repository:
```sh
git clone https://github.com/bhupi87/emailapi.git
```
2. Change directory in to the project:
```sh
cd emailapi
```
3. Checkout develop branch:
```sh
git checkout develop
```
3. Go to configuration folder to enter api-key of mail-gun and sendgrid:
```sh
cd config/
vi default.json
```
4. Go to your mailgun account (https://app.mailgun.com/app/account) and add Authorized Recipients by entering emailId of recipient:


## Testing Steps :

Point your browser to http://localhost:3000. It will open a UI , click on "Click here To Send Email Button" to send email .
Enter email Id and Content in box provided by UI and click on send button .

To Test this api using postman : Use below url and post json data in below format : http://localhost:3000/contact
JSON Data Format :
{ "emailID" : "bhupi87@gmail.com", "body" : " This is through postman" }
