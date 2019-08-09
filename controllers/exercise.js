const Exercise  = require('../models/Exercise');
const User      = require('../models/User');
const validateExercise = require('../validation/Exercise/exercise');

const test = (req, res) => res.json({ msg: '\'/api/exercise/\' works!'});

const add = (req, res) => {
  const { errors, isValid } = validateExercise(req.body);

  if (!isValid) return res.status(400).json(errors);

  const newExercise = new Exercise({
    user_id: req.body.username,
    description: req.body.description,
    duration: req.body.duration
  });

  newExercise.save().then(exercise => {
    return res.json(exercise);
  }).catch(err => console.log(err));
};

module.exports = { test, add };
