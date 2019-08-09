const express = require('express');
const router = express.Router();
const {
  test,
  newUser,
  getUser,
  login
} = require('../../controllers/user');

router.get('/test/test', test);
router.get('/:username', getUser)
router.post('/new_user', newUser);
router.post('/login', login)

module.exports = router;
