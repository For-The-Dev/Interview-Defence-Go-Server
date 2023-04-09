require('dotenv').config();
const axios = require('axios');
const models = require('../../models');
const getUserInfo = require('../../utils/getUserInfo');
const getHasTable = require('../../utils/getHasTable');
const createQuestionTable = require('../../utils/createQuestionTable');

// 깃허브에서 해당 코드로 리턴을 시켜줌.(인가 코드)
// 인가 코드를 통해 acessToken 발급. 토큰을 이용해서 현재 유저를 확인해야함.
// 현재 유저의 정보는 발급받은 accessToken을 이용해서 추출하고 테이블을 저장한다.
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

    const { userId, nickName, avatar_url, err } = await getUserInfo(accessToken);

    // 인증과정 중 에러가 발생하면 에러페이지로 이동시켜준다.
    if (err) {
      return res.redirect('http://localhost:3000/authError');
    }

    const hasTable = await getHasTable(userId);
    // 만약 해당 테이블이 존재하지 않는다면 회원가입이 진행되어야 하는 유저이다.
    if (!hasTable) {
      // 유저별 테이블 제작
      await createQuestionTable(userId);
      // 회원가입 유저 등록
      await models.Users.create({
        userId,
        nickName,
        avatar_url,
      });
    }
    // 유저에게 토큰을 전달한다.
    res.redirect(`http://localhost:3000?token=${accessToken}`);
  } catch (e) {
    res.send(e);
  }
};
