module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });
  return user;
};
