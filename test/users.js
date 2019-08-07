"use strict";

const chai      = require('chai');
const chaiHTTP  = require('chai-http');
const app       = require('../app');

const expect  = chai.expect;
chai.use(chaiHTTP);

describe('api/users', () => {

  describe("GET /test", () => {
    it("should return '/api/users/ works!'", () => {
      chai.request(app)
        .get('/api/users/test')
        .end((error, res) => {
          expect(res).to.have.status(200);
        })
    });
  })
});
