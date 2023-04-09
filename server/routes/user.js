const express = require('express');
const models = require('../models');
const controller = require('../controller');
const router = express.Router();

// 유저 정보 조회
router.get('/', controller.userInfo);

module.exports = router;
