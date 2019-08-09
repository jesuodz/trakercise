const validator = require('validator');
const isEmpty   = require('../check-empty');

const validateNewUser = data => {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPass = !isEmpty(data.confirmPass) ? data.confirmPass: '';

  if (!validator.isLength(data.username, { min: 5, max: 50 })) {
    errors.username = 'Username must be between 5 and 50 characters';
  }
  if (validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is not valid';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be between 8 and 30 characters';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  if (validator.isEmpty(data.confirmPass)) {
    errors.confirmPass = 'Confirm password field is required';
  } else if (!validator.equals(data.password, data.confirmPass)) {
    errors.confirmPass = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateNewUser;
