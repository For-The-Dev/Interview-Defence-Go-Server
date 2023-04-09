module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('Users', {
    nickName: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER(30),
      allowNull: false,
    },
  });
  return user;
};
