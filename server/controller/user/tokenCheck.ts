import { Request, Response, NextFunction } from 'express';
import getUserInfo from '../../utils/getUserInfo';

type FuncType = (req: Request, res: Response, next: NextFunction) => void;
const tokenCheck: FuncType = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send('Invalid authorization');
  try {
    const { nickName, avatar_url, githubId } = await getUserInfo(authorization);
    const userInfo = {
      nickName,
      avatar_url,
      githubId,
    };

    res.locals.userInfo = userInfo;
    next();
  } catch (e) {
    res.status(401).send(`Invalid authorization`);
  }
};

export default tokenCheck;
