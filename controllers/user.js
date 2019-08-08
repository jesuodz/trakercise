const mongoose = require('mongoose');
const User = require('../models/User');

const userController = {};

userController.test = (req, res) => {
  res.json({msg: "Users works!"});
}

userController.getUser = (req, res) => {
  let username = req.params.username;
  
  if ((username.length < 5) || (username.length > 50)) {
    return res.status(400).json({'error': 'invalid username'});
  }

  User.findOne({ username: req.params.username }).then( user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({'error': 'username not found'})
    }
  });
}

userController.createUser = (req, res) => {

  User.findOne({ username: req.body.username }).then( user => {
    if (user) {
      res.status(400).json({ 'error': 'username already exists' });
    } else {
      let newUser = new User({
        username: req.body.username
      });
      let response = { 'success': `Created '${newUser.username}' user`};
      newUser.save()
        .then(user => res.json(response))
        .catch(err => console.log(err));
    }
  });
};

module.exports = userController;
