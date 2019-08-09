const mongoose            = require('mongoose');
const User                = require('../models/User');
const validateNewUser     = require('../validation/user/new');
const validateParamsUser  = require('../validation/user/params');
const bcrypt              = require('bcryptjs');

const test = (req, res) => {
  res.json({msg: '\'/api/users/\' works!'});
}

const getUser = (req, res) => {
  const { errors, isValid } = validateParamsUser(req.params);

  if (!isValid) return res.status(400).json(errors);

  User.findById(req.params.username).then(user => {
    if (user) return res.json(user);
    else {
      errors.username = 'username not found';
      res.status(404).json(errors);
    }
  });
}

const newUser = (req, res) => {
  const { errors, isValid } = validateNewUser(req.body);

  if (!isValid) return res.status(400).json(errors);

  User.findById(req.body.username).then( user => {
    if (user) {
      errors.username = 'username already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        _id: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(newUser.password, salt).then(hash => {
          newUser.password = hash;
          newUser.save().then(user => { return res.json(user); })
            .catch(err => console.log(err));  
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }
  });
};

module.exports = { test, getUser, newUser };
