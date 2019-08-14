const
  validExercise = {
    description: 'Abdominals',
    duration: '6'
  },
  invalidExercise = {
    description: 'Push'
  },
  newExercise = {
    description: 'Push up',
    duration: '9'
  },
  wrongID = data => {
    return data._id.slice(1) + 1;
  };

module.exports = {
  validExercise,
  invalidExercise,
  wrongID,
  newExercise
};
