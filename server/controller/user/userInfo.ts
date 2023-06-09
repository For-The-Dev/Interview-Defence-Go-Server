import dotenv from 'dotenv';
import { Answer, User } from '../../models/user';
import { Response, Request } from 'express';
import { Op } from 'sequelize';
import setTimeKorea from '../../utils/setTimeKorea';

dotenv.config();

const findUserfunc = async (githubId: string) =>
  User.findOne({
    where: {
      githubId,
    },
  });

const findAllAnswerCountfunc = async (githubId: string) =>
  Answer.count({
    where: {
      UserGithubId: githubId,
    },
  });

const todayAnswerCountfunc = async (githubId: string, today: number) =>
  Answer.count({
    where: {
      UserGithubId: githubId,
      createdAt: {
        [Op.gte]: today,
      },
    },
  });

const userInfo = async (req: Request, res: Response) => {
  const { githubId } = res.locals.userInfo;
  const today = setTimeKorea().setUTCHours(0, 0, 0, 0);

  try {
    const [findUser, findAllAnswerCount, todayAnswerCount] = await Promise.all([
      findUserfunc(githubId),
      findAllAnswerCountfunc(githubId),
      todayAnswerCountfunc(githubId, today),
    ]);
    // 잘못된 토큰을 사용했을 경우 undefined의 값이 출력됨

    const todayData = await Answer.findAll({
      where: {
        UserGithubId: githubId,
        createdAt: {
          [Op.gte]: today,
        },
      },
    });

    if (findUser) {
      res.status(200).send({
        nickName: findUser.nickName,
        avatar_url: findUser.avatar_url,
        todayAnswerCount: todayAnswerCount,
        allAnswerCount: findAllAnswerCount,
      });
    }
  } catch (e) {
    res.status(400).send('bad request');
  }
};

export default userInfo;
