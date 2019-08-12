const isEmpty   = require('../check-empty');
const mongoose  = require('mongoose');

const validateParamsId = data => {
  const errors = {}

  if (!mongoose.Types.ObjectId.isValid(data)) {
    errors.invalidID = 'Exercise ID not found';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateParamsId;