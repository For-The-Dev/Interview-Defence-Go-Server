import checkUserTable from '../../utils/checkUserTable';
import { Request, Response } from 'express';
import { Answer, Question } from '../../models/user';

interface TotalCount {
  count: number;
}

const questionDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { githubId } = res.locals.userInfo;
  if (!id) return res.status(400).send('bad request');

  try {
    const tableName = await checkUserTable(githubId);

    const getQA = await Question.findOne({
      where: {
        id,
        UserGithubId: githubId,
      },
      include: [
        {
          model: Answer,
          attributes: ['text', 'id', 'createdAt', 'nickName'],
          // 우선 최근 5개까지만 보여주기
          // limit: 5,
          order: [['createdAt', 'DESC']],
        },
      ],
      attributes: ['text', 'id', 'nickName', 'createdAt'],
    });

    res.send(getQA);
  } catch (e) {
    res.status(400).send('bad Request');
  }
};

export default questionDetail;
