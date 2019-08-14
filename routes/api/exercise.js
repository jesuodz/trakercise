const express   = require('express');
const router    = express.Router();
const passport  = require('passport');
const {
  test,
  add,
  get,
  del,
  edit
} = require('../../controllers/exercise');

router.get('/test/test', test);
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  add
);
router.get('/:id', get);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  del
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  edit
);

module.exports = router;
