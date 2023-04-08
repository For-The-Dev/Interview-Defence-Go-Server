const models = require('../../models');

module.exports = async (req, res) => {
  const data = req.body;
  const { question, answer } = data;
  if (!question || !answer) res.status(406).send('조건이 잘못되었습니다.');
  try {
    const createData = await models.Question.create({
      ...data,
    });
    res.send({ createData });
  } catch (e) {
    res.status(406).send('데이터 등록이 되지 않았습니다.');
  }
};
