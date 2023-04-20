import db from '../../models/index';
import { QueryTypes } from 'sequelize';
import { Response, Request, NextFunction } from 'express';
import checkUserTable from '../../utils/checkUserTable';
import { Question, Answer } from '../../models/user';

// 해당 라우터는 진짜 첫 질문과 첫 답변을 등록하는 곳이다.
const editQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { question, answer } = data;
  const { githubId, nickName }: { githubId: number; nickName: string } =
    res.locals.userInfo;

  if (!question || !answer)
    return res.status(400).send('조건이 잘못되었습니다.');
  try {
    const tableName = await checkUserTable(githubId);
    if (!tableName) throw new Error('UnAuthorized');

    const createQuestion = await Question.create({
      text: question,
      UserGithubId: githubId,
      nickName,
    });

    const createAnswer = await Answer.create({
      text: answer,
      QuestionId: createQuestion.dataValues.id,
      UserGithubId: githubId,
      nickName,
    });

    next();
  } catch (e: any) {
    // 토큰 에러는 앞선 라우터에서 정리함
    console.log(e);
    res.status(400).send('bad Request');
  }
};

export default editQuestion;
