const express = require('express');
const router = express.Router();
const { test, add } = require('../../controllers/exercise');

router.get('/test', test);
router.post('/add', add);

module.exports = router;
