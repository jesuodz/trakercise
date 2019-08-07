"use strict";

const chai      = require('chai');
const chaiHTTP  = require('chai-http');
const app       = require('../app');
const mongoose  = require("mongoose");
const User      = require('../models/User');

const users     = require('../utils/userTests');
const should    = chai.should();

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

  describe("POST /new_user", () => {
    it("should return an id", (done) => {
      chai.request(app).post('/api/users/new_user').send(users.uniqueUser)
        .then(res => {
          res.should.have.status(200);
          res.body.should.have.property("date_created");
          res.body.should.have.property("_id");
          res.body.should.have.property("username", users.uniqueUser.username);
          done();
        }).catch(err => console.log(err));
    });
    it("should return 'error: username already exists'", (done) => {
      User(users.uniqueUser).save();
      chai.request(app).post('/api/users/new_user').send(users.uniqueUser)
        .then(res => {
          res.should.have.status(400);
          res.body.should.have.property("error", "username already exists");
          done();
        }).catch(err => console.log(err));
    });
  });
});
