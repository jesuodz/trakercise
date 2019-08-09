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
      res.json(user);
    } else {
      res.status(404).json({'error': 'username not found'})
    }
  });
}

userController.createUser = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findById(req.body.username).then( user => {
    if (user) {
      res.status(400).json({ 'error': 'username already exists' });
    } else {
      let newUser = new User({
        _id: req.body.username
      });
      let response = { 'success': `Created '${newUser._id}' user`};
      newUser.save()
        .then(user => res.json(response))
        .catch(err => console.log(err));
    }
  });
};

module.exports = userController;
