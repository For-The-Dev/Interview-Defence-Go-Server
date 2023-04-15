import getUserInfo from '../../utils/getUserInfo';
import dotenv from 'dotenv';
import user from '../../models/user';
import { Response, Request } from 'express';
dotenv.config();

const userInfo = async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send('Invalid authorization');

  try {
    const { userId } = await getUserInfo(authorization);
    // 잘못된 토큰을 사용했을 경우 undefined의 값이 출력됨
    const findUser = await user.findOne({
      where: {
        userId,
      },
    });
    if (findUser) {
      return res.status(200).send({ nickName: findUser.nickName, avatar_url: findUser.avatar_url });
    }
  } catch (e) {
    return res.status(401).send('Invalid authorization');
  }
};

export default userInfo;
