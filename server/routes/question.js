const express = require('express');
const controller = require('../controller');
const router = express.Router();

router.get('/', controller.getQuestion);

router.post('/', controller.editQuestion);

router.get('/:id', controller.questionDetail);

module.exports = router;
