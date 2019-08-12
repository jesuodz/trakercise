const express   = require('express');
const router    = express.Router();
const passport  = require('passport');
const {
  test,
  add,
  get
} = require('../../controllers/exercise');

router.get('/test/test', test);
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  add
);
router.get('/:id', get);

module.exports = router;
