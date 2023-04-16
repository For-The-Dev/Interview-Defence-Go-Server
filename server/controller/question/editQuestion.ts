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
    if (!tableName) throw new Error('UnAuthorized');
    const createQuery = `
    INSERT INTO '${tableName}' (question, answer,createdAt,updatedAt) VALUES ('${question}', '${answer}',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
    `;
    const createData = await db.sequelize.query(createQuery, { type: QueryTypes.INSERT });
    res.status(201).send('create!');
  } catch (e: any) {
    // 여기서 걸릴사유가 db에러와 token 에러임. 두에러를 분기할 방법을 찾아줄것
    res.status(401).send('UnAuthorized');
  }
};

export default editQuestion;
