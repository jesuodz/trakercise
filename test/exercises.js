"use strict";

const chai      = require('chai');
const chaiHTTP  = require('chai-http');
const app       = require('../app');

const expect  = chai.expect;
chai.use(chaiHTTP);

describe('api/exercises', () => {

  describe("GET /test", () => {
    it("should return '/api/exercises/ works!'", () => {
      chai.request(app)
        .get('/api/exercises/test')
        .end((error, res) => {
          expect(res).to.have.status(200);
        })
    });
  })
});
