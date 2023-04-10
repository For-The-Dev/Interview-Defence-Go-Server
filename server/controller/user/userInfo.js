require('dotenv').config();
const axios = require('axios');
const getUserInfo = require('../../utils/getUserInfo');
const models = require('../../models');

module.exports = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send('Invalid authorization');

  try {
    const { userId } = await getUserInfo(authorization);
    // 잘못된 토큰을 사용했을 경우 undefined의 값이 출력됨
    const user = await models.Users.findOne({
      where: {
        userId,
      },
    });

    return res.status(200).send({ nickName: user.nickName, avatar_url: user.avatar_url });
  } catch (e) {
    return res.status(401).send('Invalid authorization');
  }
};
