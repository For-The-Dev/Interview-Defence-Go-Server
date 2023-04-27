import checkUserTable from '../../utils/checkUserTable';
import { Request, Response } from 'express';
import { Answer, Question, User } from '../../models/user';

interface TotalCount {
  count: number;
}

const getQuestion = async (req: Request, res: Response) => {
  // 유저에 관한 토큰이 있는 지 나중에 확인해야함.
  // 해당 토큰을 확인하고 나서 해당 테이블에 이름을 가진 db에 저장하기
  // ?page=1&limit=10 default => 1, 10
  const { page = 1, limit = 3 } = req.query;

  // if (!page || !limit) return res.status(400).send('필요한 데이터가 존재하지 않습니다.');
  let offset = 0;
  if (+page > 1) {
    offset = +limit * (+page - 1);
  }
  const { githubId } = res.locals.userInfo;
  try {
    // 유저 검증 로직
    const tableName = await checkUserTable(githubId);

    const getAllData = await Question.findAndCountAll({
      where: {
        UserGithubId: githubId,
      },
      include: [
        {
          model: Answer,
          attributes: ['id', 'text', 'createdAt', 'nickName'],
          limit: 1,
          order: [['createdAt', 'DESC']],
        },
      ],
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'createdAt', 'text', 'nickName'],
      limit: +limit,
      offset,
    });
    res.json({
      data: [...getAllData.rows],
      pageInfo: {
        limit: +limit,
        totalCount: getAllData.count,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).send('bad Request');
  }
};

export default getQuestion;
