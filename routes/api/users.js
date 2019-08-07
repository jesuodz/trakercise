const express = require('express');
const router = express.Router();

const { test, createUser, deleteUsers } = require('../../controllers/user');

router.get('/test', test);
router.post('/new_user', createUser);

module.exports = router;
