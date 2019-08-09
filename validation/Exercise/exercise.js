const validator = require('validator');
const isEmpty   = require('../check-empty');

const validateExercise = data => {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.duration = !isEmpty(data.duration) ? data.duration : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (!validator.isLength(data.username, { min: 5, max: 50 })) {
    errors.username = 'Username must be between 5 and 50 characters';
  }
  if (validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }
  if (!validator.isLength(data.description, { min: 5, max: 140 })) {
    errors.description = 'Description must be between 5 and 140 characters';
  }
  if (validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }
  if (validator.isEmpty(data.duration)) {
    errors.duration = 'Duration field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateExercise;
