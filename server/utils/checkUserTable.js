const getUserInfo = require('./getUserInfo');
const models = require('../models');

module.exports = async (accessToken) => {
  try {
    const { userId } = await getUserInfo(accessToken);

    const { userId: findId } = await models.Users.findOne({
      where: {
        userId,
      },
    });
    // 유저 아이디를 반환함
    return findId;
  } catch (e) {
    throw new Error(e);
  }
};
