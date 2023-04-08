module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    nickName: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    githubId: {
      type: DataTypes.INTEGER(30),
      allowNull: false,
    },
  });
  return user;
};
