module.exports = function (sequelize, DataTypes) {
  // 테이블을 만든다에 개념 첫 인자 : 테이블 이름, 두번쨰 인자 : 컬럼, id,createAt,updateAt는 자동으로 생성됨.
  const question = sequelize.define('Question', {
    question: {
      // DataTypes.
      type: DataTypes.STRING(30),
      // allowNull은 요청 데이터에 해당 값이 반듯이 존재해야 함을 의미함
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  });
  return question;
};
