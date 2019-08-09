"use strict";

const chai      = require('chai');
const chaiHTTP  = require('chai-http');
const app       = require('../app');
const User      = require('../models/User');
const users     = require('../utils/samples/users');
const should    = chai.should();
const {
  validUser,
  userNotFound,
  invalidUser,
  mongoUser,
  emptyUser
} = require('../utils/samples/users');

chai.use(chaiHTTP);

describe('api/users', () => {
  
  beforeEach( (done) => {
    User.deleteMany({}, (err, res) => done());	
  });

  describe("GET /test", () => {
    it("should return '/api/users/' works!'", (done) => {
      chai.request(app).get('/api/users/test/test')
      .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property("msg", "'/api/users/' works!");
          done();
        });
    });
  });

  describe("GET /:username", () => {
    it("Should return an user object if username is valid", (done) => {
      User(mongoUser).save();
      chai.request(app).get('/api/users/' + validUser.username)
        .then(res => {
          res.should.have.status(200);
          res.body.should.have.property("_id", validUser.username);
          done();
        }).catch(err => console.log(err));
    });
    it("Should return 404 if username not found", (done) => {
      chai.request(app).get('/api/users/' + userNotFound.username)
        .then(res => {
          res.should.have.status(404);
          res.body.should.have.property('username', 'username not found');
          done();
        }).catch(err => console.log(err));
    });
    it("Should return 400 on invalid username", (done) => {
      chai.request(app).get('/api/users/' + invalidUser.username)
        .then(res => {
          res.should.have.status(400);
          res.body.should.have.property("username");
          done();
        }).catch(err => console.log(err));
    });
  });

  describe("POST /new_user", () => {
    it("Should return an user object is user is valid", (done) => {
      chai.request(app).post('/api/users/new_user').send(validUser)
        .then(res => {
          res.should.have.status(200);
          res.body.should.have.property("_id", validUser.username);
          res.body.should.have.property("date_created");
          done();
        }).catch(err => console.log(err));
    });
    it("should return an error object if username exists", (done) => {
      User(mongoUser).save();
      chai.request(app).post('/api/users/new_user').send(validUser)
        .then(res => {
          res.should.have.status(400);
          res.body.should.have.property('username', 'username already exists');
          done();
        }).catch(err => console.log(err));
    });
    it("should return an error object if user fields are not valid", (done) => {
      chai.request(app).post('/api/users/new_user').send(invalidUser)
        .then(res => {
          res.should.have.status(400);
          res.body.should.have.property('username', 'Username must be between 5 and 50 characters');
          res.body.should.have.property('email', 'Email is not valid');
          res.body.should.have.property('password');
          res.body.should.have.property('confirmPass', 'Passwords must match');
          done();
        });
    });
    it("should return an error object is user fields are empty", (done) => {
      chai.request(app).post('/api/users/new_user').send(emptyUser)
        .then(res => {
          res.should.have.status(400);
          res.body.should.have.property('username', 'Username is required')
          res.body.should.have.property('email', 'Email field is required');
          res.body.should.have.property('password');
          res.body.should.have.property('confirmPass', 'Confirm password field is required');
          done();
        }).catch(err => console.log(err));
    });
  });
});
