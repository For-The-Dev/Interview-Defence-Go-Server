const { sequelize, Sequelize } = require('../models');

module.exports = async (userId) => {
  try {
    const questionTable = await sequelize.define(`${userId}`, {
      question: {
        // DataTypes.
        type: Sequelize.STRING(300),
        // allowNull은 요청 데이터에 해당 값이 반듯이 존재해야 함을 의미함
        allowNull: false,
      },
      answer: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
    });
    await sequelize.sync();

    return true;
  } catch (e) {
    console.log(userId);
    console.log(e);
    return e;
  }
};
