var chai = require('chai')
var expect = chai.expect
var supertest = require('supertest')
var server = supertest.agent('http://localhost:3000')
describe('Send Mail APi Service', function () {
  it('Should Check Home Page Service', function (done) {
    server.get('/').expect('Content-type', 'application/json').expect(200)
   .end(function (err, res) {
     expect(res.status).to.equal(200)
     done()
   })
  })
  it('Should check email UI service page', function (done) {
    server.post('/contact').expect('Content-type', 'application/json').expect(200)
   .end(function (err, res) {
     expect(res.status).to.equal(200)
     done()
   })
  })
})
