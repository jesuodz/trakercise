const express = require('express');
const router = express.Router();

router.get('/test/test', (req, res) => res.json({ msg: "'/api/exercise/' works!"}));

module.exports = router;
