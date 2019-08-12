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
  emptyUser,
  invalidPassword,
  validEditAccount,
  invalidEditAccount
} = require('../utils/samples/users');

chai.use(chaiHTTP);

describe('api/users', () => {
  
  afterEach( done => {
    User.deleteMany({}, (err, res) => done());	
  });

  describe('GET /test', () => {
    it('should return \'/api/users/\' works!', done => {
      chai.request(app).get('/api/users/test/test')
      .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('msg', '\'/api/users/\' works!');
          done();
        });
    });
  });

  describe('GET /:username', () => {
    it('Should return an user object if username is valid', done => {
      User(mongoUser).save();
      chai.request(app).get('/api/users/' + validUser.username)
        .then(res => {
          res.should.have.status(200);
          res.body.should.have.property('_id', validUser.username);
          done();
        }).catch(err => console.log(err));
    });
    it('Should return 404 if username not found', done => {
      chai.request(app).get('/api/users/' + userNotFound.username)
        .then(res => {
          res.should.have.status(404);
          res.body.should.have.property('username', 'username not found');
          done();
        }).catch(err => console.log(err));
    });
    it('Should return 400 on invalid username', done => {
      chai.request(app).get('/api/users/' + invalidUser.username)
        .then(res => {
          res.should.have.status(400);
          res.body.should.have.property('username');
          done();
        }).catch(err => console.log(err));
    });
  });

  describe('POST /new_user', () => {
    it('Should return an user object is user is valid', done => {
      chai.request(app).post('/api/users/new_user').send(validUser)
        .then(res => {
          res.should.have.status(200);
          res.body.should.have.property('_id', validUser.username);
          res.body.should.have.property('date_created');
          done();
        }).catch(err => console.log(err));
    });
    it('should return an error object if username exists', done => {
      User(mongoUser).save();
      chai.request(app).post('/api/users/new_user').send(validUser)
        .then(res => {
          res.should.have.status(400);
          res.body.should.have.property('username', 'username already exists');
          done();
        }).catch(err => console.log(err));
    });
    it('should return an error object if user fields are not valid', done => {
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
    it('should return an error object is user fields are empty', done => {
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

  describe('POST /login', () => {
    it('Should return a token if login is successful', done => {
      chai.request(app).post('/api/users/new_user').send(validUser).then(() => {
        chai.request(app).post('/api/users/login').send(validUser)
          .then(res => {
            res.should.have.status(200);
            res.body.should.have.property('success', true);
            res.body.should.have.property('token');
            done();
          }).catch(err => console.log(err));
      });
    });
    it('Should return an error object if login data is invalid', done => {
      chai.request(app).post('/api/users/login').send(invalidUser)
        .then(res => {
          res.should.have.status(400);
          res.body.should.have.property('username', 'Username must be between 5 and 50 characters');
          res.body.should.have.property('password', 'Password must be between 8 and 30 characters')
          done();
        }).catch(err => console.log(err));
    });
    it('Should return an error object if username is not found', done => {
      chai.request(app).post('/api/users/login').send(userNotFound)
        .then(res => {
          res.should.have.status(404);
          res.body.should.have.property('username', 'Username not found');
          done();
        }).catch(err => console.log(err));
    });
    it('Should return an error object if password doesn\'t match', done => {
      chai.request(app).post('/api/users/new_user').send(validUser).then(() => {
        chai.request(app).post('/api/users/login').send(invalidPassword)
          .then(res => {
            res.should.have.status(400);
            res.body.should.have.property('success', false);
            res.body.should.have.property('password', 'Incorrect password');
            done();
          }).catch(err => console.log(err));
      });
    });
  });

  describe('DELETE /account', () => {
    it('Should return a success message if authorized', done => {
      chai.request(app).post('/api/users/new_user').send(validUser).then(() => {
        chai.request(app).post('/api/users/login').send(validUser).then(res => {
            const auth = { 'Authorization' : res.body.token };
            chai.request(app).delete('/api/users/account').set(auth)
              .then(res => {
                res.body.should.have.property('success', true);
                done();
              });
          }).catch(err => console.log(err));
      });
    });
  });

  describe('PUT /account', () => {
    it('Should return a success message if not valid', done => {
      chai.request(app).post('/api/users/new_user').send(validUser).then(() => {
        chai.request(app).post('/api/users/login').send(validUser).then(res => {
            const auth = { 'Authorization' : res.body.token };
            chai.request(app).put('/api/users/account').set(auth).send(validEditAccount)
              .then(res => {
                res.body.should.have.property('success', true);
                done();
              });
          }).catch(err => console.log(err));
      });
    });
    it('Should return an error message if data is valid', done => {
      chai.request(app).post('/api/users/new_user').send(validUser).then(() => {
        chai.request(app).post('/api/users/login').send(validUser).then(res => {
            const auth = { 'Authorization' : res.body.token };
            chai.request(app).put('/api/users/account').set(auth).send(invalidEditAccount)
              .then(res => {
                res.should.have.status(400);
                res.body.should.have.property('password');
                res.body.should.have.property('email');
                done();
              });
          }).catch(err => console.log(err));
      });
    });
  });
});
