"use strict";

const chai      = require('chai');
const chaiHTTP  = require('chai-http');
const app       = require('../app');

const should  = chai.should;
chai.use(chaiHTTP);

describe('api/exercises', () => {

  describe("GET /test", () => {
    it("should return '/api/exercise/ works!'", () => {
      chai.request(app)
        .get('/api/exercise/test/test')
        .end((error, res) => {
          res.should.have.status(200);
        })
    });
  })
});
