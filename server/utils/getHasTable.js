const models = require('../models');

module.exports = async (userId) => {
  try {
    const findTable = await models.sequelize.query(`SELECT name FROM sqlite_master WHERE type='table' AND name='${userId}';`, {
      type: models.Sequelize.QueryTypes.SELECT,
    });

    // findTable = [ { name: 'hasdis' } ] 테이블이 존재하면 해당 형태로 반환된다.
    if (findTable.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return new Error(e);
  }
};
// 테이블이 존재하는지 확인합니다.
