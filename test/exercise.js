"use strict";

const chai          = require('chai');
const chaiHTTP      = require('chai-http');
const app           = require('../app');
const Exercise      = require('../models/Exercise');
const User          = require('../models/User');
const should        = chai.should();
const { validUser } = require('../utils/samples/users');
const {
  validExercise,
  invalidExercise
}  = require('../utils/samples/exercise');

chai.use(chaiHTTP);

describe('api/exercise', () => {
  before( done => {
    chai.request(app).post('/api/users/new_user').send(validUser)
      .then(() => done());
  });

  beforeEach( done => {
    Exercise.deleteMany({}, (err, res) => done());
  });

  after( done => {
    User.deleteMany({}, (err, res) => done());
  });

  describe('GET /test', () => {
    it('Should return \'/api/exercise/\' works!', done => {
      chai.request(app)
        .get('/api/exercise/test/test')
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('msg', '\'/api/exercise/\' works!');
          done();
        });
    });
  });
  
  describe('POST /add', () => {
    it('Should return an object if passed exercise is valid', done => {
      chai.request(app).post('/api/users/login').send(validUser).then(res => {
        const auth = { 'Authorization' : res.body.token };
        chai.request(app).post('/api/exercise/add').set(auth).send(validExercise)
          .then(res => {
            res.should.have.status(200);
            res.body.should.have.property('user_id');
            res.body.should.have.property('duration', Number(validExercise.duration));
            res.body.should.have.property('description', validExercise.description);
            done();
          }).catch(err => console.log(err));
      });
    });
    it('Should return an error object if passed exercise is invalid', done => {
      chai.request(app).post('/api/users/login').send(validUser).then(res => {
        const auth = { 'Authorization' : res.body.token };
        chai.request(app).post('/api/exercise/add').set(auth).send(invalidExercise)
          .then(res => {
            res.should.have.status(400);
            res.body.should.have.property('duration', 'Duration field is required');
            res.body.should.have.property('description', 'Description must be between 5 and 140 characters');
            done();
          }).catch(err => console.log(err));
        });
    });
  });
});
