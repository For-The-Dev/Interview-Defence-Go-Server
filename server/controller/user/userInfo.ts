import getUserInfo from '../../utils/getUserInfo';
import dotenv from 'dotenv';
import user from '../../models/user';
import { Response, Request } from 'express';
dotenv.config();

const userInfo = async (req: Request, res: Response) => {
  const { userId } = res.locals.userInfo;

  try {
    // 잘못된 토큰을 사용했을 경우 undefined의 값이 출력됨
    const findUser = await user.findOne({
      where: {
        userId,
      },
    });
    if (findUser) {
      res.status(200).send({ nickName: findUser.nickName, avatar_url: findUser.avatar_url });
    }
  } catch (e) {
    res.status(400).send('bad request');
  }
};

export default userInfo;
