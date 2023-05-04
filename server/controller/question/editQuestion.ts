import { Response, Request, NextFunction } from 'express';
import checkUserTable from '../../utils/checkUserTable';
import { Question, Answer } from '../../models/user';

interface QAType {
  answer: string;
  question: string;
}

interface CreateQuestionType {
  id: number;
  text: string;
  UserGithubId: number;
  nickName: string;
  updateAt: string;
  createdAt: string;
}

// 해당 라우터는 진짜 첫 질문과 첫 답변을 등록하는 곳이다.
const editQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { data } = req.body;

  if (data.length < 0) return res.status(400).send('bad request');
  const { githubId, nickName }: { githubId: number; nickName: string } =
    res.locals.userInfo;

  try {
    const tableName = await checkUserTable(githubId);
    if (!tableName) throw new Error('UnAuthorized');

    const editAllQuestions: CreateQuestionType[] = await Promise.all(
      data.map(async (qa: QAType) => {
        const { question } = qa;
        const createQuestion = await Question.create({
          text: question,
          UserGithubId: githubId,
          nickName,
        });
        return createQuestion;
      })
    );

    const editAllAnswer = await Promise.all(
      editAllQuestions.map((qa, idx) => {
        const answer = data[idx].answer;
        const createAnswer = Answer.create({
          text: answer,
          QuestionId: qa.id,
          UserGithubId: githubId,
          nickName,
        });
        return createAnswer;
      })
    );

    next();
  } catch (e: any) {
    // 토큰 에러는 앞선 라우터에서 정리함

    res.status(400).send('bad Request');
  }
};

export default editQuestion;
