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
  invalidExercise,
  wrongID,
  newExercise
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

  describe('GET /:exercise', () => {
    it('Should return an object if passed exercise ID is valid', done => {
      chai.request(app).post('/api/users/login').send(validUser).then(res => {
        const auth = { 'Authorization' : res.body.token };
        chai.request(app).post('/api/exercise/add').set(auth).send(validExercise)
          .then(res => {
            const exercise = res.body;
            chai.request(app).get('/api/exercise/' + exercise._id).then(res => {
              res.should.have.status(200);
              res.body.should.have.property('_id', exercise._id);
              res.body.should.have.property('user_id', exercise.user_id);
              res.body.should.have.property('duration', exercise.duration);
              res.body.should.have.property('description', exercise.description);
              done();
            });
          });
      });
    });
    it('Should return \'Exercise ID not found\' if sent ID is not valid', done => {
      chai.request(app).post('/api/users/login').send(validUser).then(res => {
        const auth = { 'Authorization' : res.body.token };
        chai.request(app).post('/api/exercise/add').set(auth).send(validExercise)
          .then(() => {
            chai.request(app).get('/api/exercise/' + 1).then(res => {
              res.should.have.status(400);
              res.body.should.have.property('invalidID', 'Exercise ID not found');
              done();
            });
          });
      });
    });
    it('Should return \'Exercise not found\' if sent ID is not found', done => {
      chai.request(app).post('/api/users/login').send(validUser).then(res => {
        const auth = { 'Authorization' : res.body.token };
        chai.request(app).post('/api/exercise/add').set(auth).send(validExercise)
          .then(res => {
            chai.request(app).get('/api/exercise/' + wrongID(res.body)).then(res => {
              res.should.have.status(404);
              res.body.should.have.property('exercisenotfound', 'Exercise not found');
              done();
            });
          });
      });
    });
  });

  describe('DELETE /:exercise', () => {
    it('Should return \'{success: true}\' if passed exercise ID is valid', done => {
      chai.request(app).post('/api/users/login').send(validUser).then(res => {
        const auth = { 'Authorization' : res.body.token };
        chai.request(app).post('/api/exercise/add').set(auth).send(validExercise)
          .then(res => {
            const exercise = res.body;
            chai.request(app).delete('/api/exercise/' + exercise._id).set(auth).then(res => {
              res.should.have.status(200);
              res.body.should.have.property('success', true);
              done();
            });
          });
      });
    });
    it('Should return \'Exercise ID not found\' if sent ID is not valid', done => {
      chai.request(app).post('/api/users/login').send(validUser).then(res => {
        const auth = { 'Authorization' : res.body.token };
        chai.request(app).post('/api/exercise/add').set(auth).send(validExercise)
          .then(() => {
            chai.request(app).delete('/api/exercise/' + 1).set(auth).then(res => {
              res.should.have.status(400);
              res.body.should.have.property('invalidID', 'Exercise ID not found');
              done();
            });
          });
      });
    });
    it('Should return \'Exercise not found\' if sent ID is not found', done => {
      chai.request(app).post('/api/users/login').send(validUser).then(res => {
        const auth = { 'Authorization' : res.body.token };
        chai.request(app).post('/api/exercise/add').set(auth).send(validExercise)
          .then(res => {
            chai.request(app).delete('/api/exercise/' + wrongID(res.body)).set(auth).then(res => {
              res.should.have.status(404);
              res.body.should.have.property('exercisenotfound', 'Exercise not found');
              done();
            });
          });
      });
    });
  });

  describe('PUT /:exercise', () => {
    it('Should return \'{success: true}\' if passed exercise data is valid', done => {
      chai.request(app).post('/api/users/login').send(validUser).then(res => {
        const auth = { 'Authorization' : res.body.token };
        chai.request(app).post('/api/exercise/add').set(auth).send(validExercise)
          .then(res => {
            const exercise = res.body;
            chai.request(app).put('/api/exercise/' + exercise._id).set(auth).send(newExercise)
              .then(res => {
                res.should.have.status(200);
                res.body.should.have.property('success', true);
                done();
              });
          });
      });
    });
    it('Should return errors if sent exercise data is not valid', done => {
      chai.request(app).post('/api/users/login').send(validUser).then(res => {
        const auth = { 'Authorization' : res.body.token };
        chai.request(app).post('/api/exercise/add').set(auth).send(validExercise)
          .then(() => {
            chai.request(app).put('/api/exercise/' + 1).set(auth).send(invalidExercise)
              .then(res => {
                res.should.have.status(400);
                res.body.should.have.property('invalidID', 'Invalid Exercise ID');
                res.body.should.have.property('duration', 'Duration field is required');
                res.body.should.have.property('description', 'Description must be between 5 and 140 characters');
                done();
              });
          });
      });
    });
    it('Should return \'Exercise not found\' if sent ID is not found', done => {
      chai.request(app).post('/api/users/login').send(validUser).then(res => {
        const auth = { 'Authorization' : res.body.token };
        chai.request(app).post('/api/exercise/add').set(auth).send(validExercise)
          .then(res => {
            chai.request(app).put('/api/exercise/' + wrongID(res.body)).set(auth)
              .send(newExercise).then(res => {
                res.should.have.status(404);
                res.body.should.have.property('exercisenotfound', 'Exercise not found');
                done();
              });
          });
      });
    });
  });
});
