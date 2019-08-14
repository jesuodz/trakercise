const Exercise              = require('../models/Exercise');
const User                  = require('../models/User');
const validateExercise      = require('../validation/Exercise/exercise');
const validateParamsId      = require('../validation/Exercise/paramsId');
const validateEditExercise  = require('../validation/Exercise/edit');

const test = (req, res) => res.json({ msg: '\'/api/exercise/\' works!'});

const add = (req, res) => {
  const { errors, isValid } = validateExercise(req.body);

  if (!isValid) return res.status(400).json(errors);

  const newExercise = new Exercise({
    user_id: req.user.id,
    description: req.body.description,
    duration: req.body.duration
  });

  newExercise.save().then(exercise => {
    return res.json(exercise);
  }).catch(err => console.log(err));
};

const get = (req, res) => {
  const { errors, isValid } = validateParamsId(req.params.id);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Exercise.findById(req.params.id).then(exercise => {
    if (exercise) return res.json(exercise);
    else {
      errors.exercisenotfound = 'Exercise not found';
      return res.status(404).json(errors);
    }
  }).catch(err => console.log(err));
};

const del = (req, res) => {
  const { errors, isValid } = validateParamsId(req.params.id);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Exercise.findById(req.params.id).then(exercise => {
    if (exercise) {
      Exercise.deleteOne({ _id: req.params.id }).then(() => {
        return res.json({ success: true });
      });
    }

const edit = (req, res) => {
  const data = { id: req.params.id, ...req.body };
  const { errors, isValid } = validateEditExercise(data);

  if (!isValid) return res.status(400).json(errors);

  Exercise.findById(req.params.id).then(exercise => {
    if (exercise) {
      Exercise.updateOne(
        {_id: req.params.id },
        { $set: req.body },
        { upsert: true }
      ).then(() => res.json({ success: true })).catch(err => console.log(err));
    } else {
      errors.exercisenotfound = 'Exercise not found';
      return res.status(404).json(errors);
    }
  });
};

module.exports = { test, add, get, del, edit };
