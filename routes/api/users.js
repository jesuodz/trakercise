const express   = require('express');
const router    = express.Router();
const passport  = require('passport');
const {
  test,
  newUser,
  getUser,
  login,
  deleteUser,
  editUser
} = require('../../controllers/user');

router.get('/test/test', test);
router.get('/:username', getUser);
router.post('/new_user', newUser);
router.post('/login', login);
router.put(
  '/account',
  passport.authenticate('jwt', { session: false }),
  editUser
);
router.delete(
  '/account',
  passport.authenticate('jwt', { session: false }),
  deleteUser
);

module.exports = router;
