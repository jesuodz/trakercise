const validator = require('validator');
const isEmpty   = require('../check-empty');

const validateParamsUser = data => {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';

  if (!validator.isLength(data.username, { min: 5, max: 50 })) {
    errors.username = 'Username must be between 5 and 50 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateParamsUser;
