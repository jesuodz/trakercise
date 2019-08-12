const mongoose            = require('mongoose');
const User                = require('../models/User');
const validateNewUser     = require('../validation/User/new');
const validateParamsUser  = require('../validation/User/params');
const validateLogin       = require('../validation/User/login');
const validateEditUser    = require('../validation/User/edit');
const bcrypt              = require('bcryptjs');
const jwt                 = require('jsonwebtoken');
const { SECRET }          = require('../config')();

const test = (req, res) => res.json({msg: '\'/api/users/\' works!'});

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

const login = (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) return res.status(400).json(errors);

  User.findById(req.body.username).then(user => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then(match => {
        if (match) {
          const payload = { username: user.id };
          jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ success: true, token: `Bearer ${token}` });
          });
        } else {
          errors.password = 'Incorrect password'
          return res.status(400).json({success: false, ...errors});
        }
      }).catch(err => console.log(err));
    } else {
      errors.username = 'Username not found';
      return res.status(404).json(errors);
    }
  });
};

const deleteUser = (req, res) => {
  User.findById(req.user._id).then(account => {
    User.deleteOne().then(() => {
      res.json({ success: true, deleted: account.id })
    }).catch(err => console.log(err));
  });
};

const editUser = (req, res) => {
  const { errors, isValid } = validateEditUser(req.body);

  if (!isValid) return res.status(400).json(errors);

  (async function() {
    if (req.body.password) {
      await bcrypt.genSalt(10).then( async salt => {
        await bcrypt.hash(req.body.password, salt).then(hash => {
          req.body.password = hash;
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }

    await User.updateOne(
      { _id: req.user.id },
      { $set: req.body },
      { upsert: true }
    ).then(() => res.json({ success: true }))
    .catch(err => console.log(err));
  })();
};

module.exports = { test, getUser, newUser, login, deleteUser, editUser };
