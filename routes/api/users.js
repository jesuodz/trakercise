const express   = require('express');
const router    = express.Router();
const passport  = require('passport');
const {
  test,
  newUser,
  getUser,
  login,
  current
} = require('../../controllers/user');

router.get('/test/test', test);
router.get('/:username', getUser);
router.get(
  '/current/user',
  passport.authenticate('jwt', { session: false }),
  current
);
router.post('/new_user', newUser);
router.post('/login', login);

module.exports = router;
