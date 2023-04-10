const models = require('../../models');
const checkUserTable = require('../../utils/checkUserTable');

module.exports = async (req, res) => {
  const data = req.body;
  const { question, answer } = data;
  const { authorization } = req.headers;
  console.log(question, answer, authorization);
  if (!question || !answer || !authorization) return res.status(400).send('조건이 잘못되었습니다.');
  try {
    const tableName = await checkUserTable(authorization);
    const createQuery = `
    INSERT INTO '${tableName}' (question, answer,createdAt,updatedAt) VALUES ('${question}', '${answer}',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
    `;
    const createData = await models.sequelize.query(createQuery, { type: models.Sequelize.QueryTypes.INSERT });
    res.status(201).send('create!');
  } catch (e) {
    console.log(e);
    res.status(406).send(e);
  }
};
