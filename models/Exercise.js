const mongoose  = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  user_id: {
    type: String,
    ref: 'users',
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 140
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Exercise = mongoose.model('exercise', ExerciseSchema);
