const axios = require('axios');

module.exports = async (accessToken) => {
  try {
    // 깃허브에 유저 정보 요청
    const userInfo = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const {
      data: { login: nickName, id: userId, avatar_url },
    } = userInfo;
    return { nickName, userId: `${userId}s`, avatar_url };
  } catch (err) {
    return { err };
  }
};
