import { Model, Optional, DataTypes } from 'sequelize';
import db from './index';

interface UserAttributes {
  nickName: string;
  avatar_url: string;
  userId: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> {}
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const user = db.sequelize.define<UserInstance>('Users', {
  nickName: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  avatar_url: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

export default user;
