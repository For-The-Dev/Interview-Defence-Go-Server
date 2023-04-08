const express = require('express');
const models = require('../models');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { userName } = req.body;

  try {
    // 회원가입 된 유저가 가져야할 항목 설정
    const userModel = models.sequelize.define(userName, {
      userId: {
        type: models.Sequelize.STRING(20),
        primaryKey: true,
      },
    });

    // 유저 이름에 데이블 생성
    await models.sequelize.sync();

    res.send('create');
  } catch (e) {
    console.log('err');
    console.log(e);
    res.status(401).send(e);
  }
});

module.exports = router;
