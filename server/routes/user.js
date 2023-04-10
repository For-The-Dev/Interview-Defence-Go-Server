const express = require('express');
const models = require('../models');
const controller = require('../controller');
const router = express.Router();

// 유저 정보 조회
router.get('/', controller.userInfo);

// 유저가 했던 질문 상세 조회
router.get('/questions', controller.getQuestion);

// 유저가 질문을 보내기
router.post('/editQuestion', controller.editQuestion);
module.exports = router;
