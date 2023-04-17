import db from '../../models/index';
import { QueryTypes } from 'sequelize';
import { Response, Request, NextFunction } from 'express';

import checkUserTable from '../../utils/checkUserTable';

const editQuestion = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const { question, answer } = data;
  const { userId } = res.locals.userInfo;
  if (!question || !answer) return res.status(400).send('조건이 잘못되었습니다.');
  try {
    const tableName = await checkUserTable(userId);
    if (!tableName) throw new Error('UnAuthorized');
    const createQuery = `
    INSERT INTO '${tableName}' (question, answer,createdAt,updatedAt) VALUES ('${question}', '${answer}',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
    `;
    const createData = await db.sequelize.query(createQuery, { type: QueryTypes.INSERT });
    // 질문과 답변을 등록하면 해당 답변을 체크하고 정답을 화면에 돌려줘야함.
    next();
  } catch (e: any) {
    // 토큰 에러는 앞선 라우터에서 정리함
    res.status(400).send('bad Request');
  }
};

export default editQuestion;
