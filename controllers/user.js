const mongoose        = require('mongoose');
const User            = require('../models/User');
const userController  = {};
const validateUser = require('../validation/user');

userController.test = (req, res) => {
  res.json({'msg': "'/api/users/' works!"});
}

userController.getUser = (req, res) => {
  const { errors, isValid } = validateUser(req.params);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findById(req.params.username).then(user => {
    if (user) {
      return res.json(user);
    } else {
      errors.username = 'username not found';
      res.status(404).json(errors);
    }
  });
}

userController.newUser = (req, res) => {
  const { errors, isValid } = validateUser(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findById(req.body.username).then( user => {
    if (user) {
      errors.username = 'username already exists';
      return res.status(400).json(errors);
    } else {
      let newUser = new User({
        _id: req.body.username
      });

      newUser.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
};

module.exports = userController;
