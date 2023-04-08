const models = require('../../models');
module.exports = async (req, res) => {
  const { id } = req.params;
  // 데이터를 한가지만 찾을때는 findOne을 사용한다. model.테이블명.findOne({ 조건 })
  //  {안에 조건을 써준다. where : { id }} 여기서 id는 컬럼에 id가 params에 아이디랑 같은 것을 찾는 것.
  models.Question.findOne({
    where: {
      id,
    },
  })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
