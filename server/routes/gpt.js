const express = require('express');
const controller = require('../controller');

const router = express.Router();

router.post('/interview', controller.sendGpt);

module.exports = router;
