import { Sequelize, Optional, Model, DataTypes } from 'sequelize';
import db from '../models/index';

interface QuestionAttributes {
  question: string;
  answer: string;
}

interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'answer'> {}
interface QuestionInstance extends Model<QuestionAttributes, QuestionCreationAttributes>, QuestionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const createQuestionTable = async (userId: string) => {
  try {
    const questionTable = await db.sequelize.define<QuestionInstance>(
      userId,
      {
        question: {
          // DataTypes.
          type: DataTypes.STRING(300),
          // allowNull은 요청 데이터에 해당 값이 반듯이 존재해야 함을 의미함
          allowNull: false,
          unique: false,
        },
        answer: {
          type: DataTypes.STRING(300),
          allowNull: false,
          unique: false,
        },
      },
      { timestamps: true }
    );
    await db.sequelize.sync();

    return true;
  } catch (e: any) {
    throw new Error(e);
  }
};

export default createQuestionTable;
