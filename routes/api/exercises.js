const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({ message: 'api/exercise/ works!'}));

module.exports = router;
