const mongoose = require('mongoose');
const User = require('../models/User');

const userController = {};

userController.test = (req, res) => {
  res.json({msg: "Users works!"});
}

userController.createUser = (req, res) => {

  User.findOne({ _id: req.body.username }).then( user => {
    if (user) {
      return res.status(400).json({ 'error': 'username already exists' });
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
