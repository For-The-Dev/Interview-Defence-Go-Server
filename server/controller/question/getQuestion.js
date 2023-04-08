const models = require('../../models');
module.exports = async (req, res) => {
  // 유저에 관한 토큰이 있는 지 나중에 확인해야함.
  // 해당 토큰을 확인하고 나서 해당 테이블에 이름을 가진 db에 저장하기
  try {
    const data = await models.Question.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
