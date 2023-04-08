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

    console.log(resData.data);
    const accessToken = resData.data.access_token;
  } catch (e) {
    res.send(e);
  }
};
