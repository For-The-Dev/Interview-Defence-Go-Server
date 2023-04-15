import db from '../../models/index';
import { QueryTypes } from 'sequelize';
import { Response, Request } from 'express';

import checkUserTable from '../../utils/checkUserTable';

const editQuestion = async (req: Request, res: Response) => {
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
    const createData = await db.sequelize.query(createQuery, { type: QueryTypes.INSERT });
    res.status(201).send('create!');
  } catch (e) {
    console.log(e);
    res.status(406).send(e);
  }
};

export default editQuestion;
