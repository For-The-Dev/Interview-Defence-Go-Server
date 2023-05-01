import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from './index';

interface UserAttributes {
  nickName: string;
  avatar_url: string;
  githubId: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'githubId'> {}
interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

// 유저를 저장하는 테이블 구조
const User = sequelize.define<UserInstance>('Users', {
  nickName: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  avatar_url: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  githubId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
});

// Question 모델의 속성을 정의하는 인터페이스
interface QuestionAttributes {
  text: string;
  UserGithubId?: number;
  id?: number;
  nickName: string;
}

interface QuestionCreationAttributes
  extends Optional<QuestionAttributes, 'UserGithubId'> {}

interface QuestionInstance
  extends Model<QuestionAttributes, QuestionCreationAttributes>,
    QuestionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Question = sequelize.define<QuestionInstance>('Question', {
  text: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  nickName: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

interface AnswerAttributes {
  id: number;
  text: string;
  QuestionId?: number;
  UserGithubId?: number;
  nickName: string;
  createdAt?: Date;
}

// Answer 모델 생성 시 필요한 속성들 중 생략 가능한 속성들을 정의하는 인터페이스
interface AnswerCreationAttributes extends Optional<AnswerAttributes, 'id'> {}

// Answer 모델의 인스턴스에서 사용할 메서드와 속성을 정의하는 인터페이스
interface AnswerInstance
  extends Model<AnswerAttributes, AnswerCreationAttributes>,
    AnswerAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

// Answer 모델 정의
const Answer = sequelize.define<AnswerInstance>('Answer', {
  text: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  nickName: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});
// 유저와 질문-댓글은 1:N 관계
User.hasMany(Question);
User.hasMany(Answer);

// 질문-댓글과 유저는 N:1 관계
Question.belongsTo(User);
Answer.belongsTo(User);

// 한가지 질문에 Question은 많은 답을 할 수 있기에
Question.hasMany(Answer);

export { User, Answer, Question };
