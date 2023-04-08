require('dotenv').config();
const axios = require('axios');

module.exports = async (req, res) => {
  const clientID = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const requestToken = req.query.code;

  try {
    let resData = await axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      headers: {
        accept: 'application/json',
      },
    });

    const accessToken = resData.data.access_token;
    // 유저에게 토큰을 전달한다.
    res.redirect(`http://localhost:3000?token=${accessToken}`);

    // 유저 정보 요청 + 유저 정보 db에 저장 createOr?
  } catch (e) {
    res.send(e);
  }
};
