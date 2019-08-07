"use strict";

const chai      = require('chai');
const chaiHTTP  = require('chai-http');
const app       = require('../app');
const Exercise  = require('../models/exercise');

const should  = chai.should;
chai.use(chaiHTTP);

describe('api/exercises', () => {
  
  beforeEach( (done) => {
    Exercise.deleteMany({}, (err, res) => done());
  });

  describe("GET /test", (done) => {
    it("should return '/api/exercises/ works!'", () => {
      chai.request(app)
        .get('/api/exercises/test')
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
