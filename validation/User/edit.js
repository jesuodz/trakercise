const validator = require('validator');
const isEmpty   = require('../check-empty');

const validateEditUser = data => {
  let errors = {};
  
  if (!isEmpty(data.email)) {
    if (!validator.isEmail(data.email)) {
      errors.email = 'Email is not valid';
    }
  }
  if (!isEmpty(data.password)) {
    if (!validator.isLength(data.password, { min: 8, max: 30 })) {
      errors.password = 'Password must be between 8 and 30 characters';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateEditUser;
