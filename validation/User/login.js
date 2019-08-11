const validator = require('validator');
const isEmpty   = require('../check-empty');

const validateLogin = data => {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!validator.isLength(data.username, { min: 5, max: 50 })) {
    errors.username = 'Username must be between 5 and 50 characters';
  }
  if (validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }
  if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be between 8 and 30 characters';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLogin;
