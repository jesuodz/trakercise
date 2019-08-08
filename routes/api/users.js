const express = require('express');
const router = express.Router();
const {
  test,
  createUser,
  deleteUsers,
  getUser
} = require('../../controllers/user');

router.get('/test', test);
router.get('/:username', getUser)
router.post('/new_user', createUser);

module.exports = router;
