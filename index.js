var path = require('path')
var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var mailer = require('./mailer.js')
var app = express()
var server = require('http').createServer(app)
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname + '/assets/')))

// Handle GET request
app.get('/', function (req, res) {
  res.render('index')
})

app.get('/contact', function (req, res) {
  res.render('contact')
})

// Handle POST request
app.post('/contact', function (req, res) {
  mailer.manageSendEmail(req, function (result) {
    res.send(result)
  })
})

server.listen(3000, function () {
  console.log('Email API is listening on http://localhost:3000/')
})
