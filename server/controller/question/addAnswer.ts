import { Response, Request, NextFunction } from 'express';
import checkUserTable from '../../utils/checkUserTable';
import { Question, Answer } from '../../models/user';

// 해당 라우터는 진짜 첫 질문과 첫 답변을 등록하는 곳이다.
const addAnswer = async (req: Request, res: Response, next: NextFunction) => {
  const { data } = req.body;
  const { id } = req.params;
  const { question, answer } = data;
  const { githubId, nickName }: { githubId: number; nickName: string } =
    res.locals.userInfo;

  if (!question || !answer || !id)
    return res.status(400).send('조건이 잘못되었습니다.');
  const questionTable = await Question.findAll({
    where: {
      id,
    },
  });
  if (questionTable.length <= 0)
    return res.status(400).send('존재하지 않습니다.');
  try {
    const tableName = await checkUserTable(githubId);
    if (!tableName) throw new Error('UnAuthorized');
    const createAnswer = await Answer.create({
      text: answer,
      QuestionId: +id,
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

export default addAnswer;
