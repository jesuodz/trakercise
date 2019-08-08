"use strict";

const chai      = require('chai');
const chaiHTTP  = require('chai-http');
const app       = require('../app');
const User      = require('../models/User');
const should    = chai.should();
const {
  validUser,
  userNotFound,
  invalidUser
} = require('../utils/userTests');

chai.use(chaiHTTP);

describe('api/users', () => {
  
  beforeEach( (done) => {
    User.deleteMany({}, (err, res) => done());	
  });

  describe("GET /test", () => {
    it("should return '/api/users/ works!'", (done) => {
      chai.request(app).get('/api/users/test')
      .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("GET /:username", () => {
    it("Should return an user object if username is valid", (done) => {
      User(validUser).save();
      chai.request(app).get('/api/users/' + validUser.username)
        .then(res => {
          res.should.have.status(200);
          res.body.should.have.property("username", validUser.username);
          done();
        }).catch(err => console.log(err));
    });
    it("Should return 404 if username not found", (done) => {
      chai.request(app).get('/api/users/' + userNotFound.username)
        .then(res => {
          res.should.have.status(404);
          res.body.should.have.property('error');
          done();
        }).catch(err => console.log(err));
    });
    it("Should return 400 on invalid username", (done) => {
      chai.request(app).get('/api/users/' + invalidUser.username)
        .then(res => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          done();
        }).catch(err => console.log(err));
    });
  });

  describe("POST /new_user", () => {
    it("should return a 'success' object", (done) => {
      let msg = `Created '${validUser.username}' user`;
      chai.request(app).post('/api/users/new_user').send(validUser)
        .then(res => {
          res.should.have.status(200);
          res.body.should.have.property("success", msg);
          done();
        }).catch(err => console.log(err));
    });
    it("should return 'error: username already exists'", (done) => {
      User(validUser).save();
      chai.request(app).post('/api/users/new_user').send(validUser)
        .then(res => {
          res.should.have.status(400);
          res.body.should.have.property('error', 'username already exists');
          done();
        }).catch(err => console.log(err));
    });
  });
});
