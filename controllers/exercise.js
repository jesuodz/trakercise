const Exercise  = require('../models/Exercise');
const User      = require('../models/User');

const test = (req, res) => {
  res.json({ msg: '\'/api/exercise/\' works!'});
}

const add = (req, res) => {

  let exercise = {
    user_id: req.body.username,
    description: req.body.description,
    duration: req.body.duration
  }

  User.findById(req.body.username).then(user => {
    let newExercise = new Exercise(exercise);

    if (user) {
      newExercise.save().then(exercise => {
        return res.json(exercise);
      });
    } else {
      let newUser = new User({_id: req.body.username});

      newUser.save().then(user => {
        newExercise.save().then(exercise => {
          return res.json(exercise);
        });
      });
    }
  });
}

module.exports = { test, add };
