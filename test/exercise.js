"use strict";

const chai            = require('chai');
const chaiHTTP        = require('chai-http');
const app             = require('../app');
const Exercise        = require('../models/Exercise');
const should          = chai.should();

const {
  validExercise, invalidExercise
}  = require('../utils/samples/exercise');

chai.use(chaiHTTP);

describe('api/exercise', () => {
  
  beforeEach( (done) => {
    Exercise.deleteMany({}, (err, res) => done());
  });

  describe("GET /test", () => {
    it("should return '/api/exercise/ works!'", (done) => {
      chai.request(app)
        .get('/api/exercise/test/test')
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });

    describe("POST /add", () => {
      it("should return an object if passed exercise is valid", (done) => {
        chai.request(app).post('/api/exercise/add').send(validExercise)
          .then(res => {
            res.should.have.status(200);
            res.body.should.have.property("user_id", validExercise.username);
            res.body.should.have.property("duration", validExercise.duration);
            res.body.should.have.property("description", validExercise.description);
            done();
          }).catch(err => console.log(err));
      });
    });
  });
});
