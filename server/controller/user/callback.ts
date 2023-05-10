import dotenv from 'dotenv';
import axios from 'axios';
import getUserInfo from '../../utils/getUserInfo';
import { Request, Response } from 'express';
import { User } from '../../models/user';

dotenv.config();

interface GitUser {
  githubId: number;
  nickName: string;
  avatar_url: string;
}
// 깃허브에서 해당 코드로 리턴을 시켜줌.(인가 코드)
// 인가 코드를 통해 acessToken 발급. 토큰을 이용해서 현재 유저를 확인해야함.
// 현재 유저의 정보는 발급받은 accessToken을 이용해서 추출하고 테이블을 저장한다.
const callback = async (req: Request, res: Response) => {
  const clientID = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const requestToken = req.query.code;

  try {
    let resData = await axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      headers: {
        accept: 'application/json',
      },
    });
    const accessToken = resData.data.access_token;

    const { githubId, nickName, avatar_url } = (await getUserInfo(
      accessToken
    )) as GitUser;

    // 회원가입 유저 등록
    await User.findOrCreate({
      where: {
        githubId: githubId,
      },
      defaults: {
        nickName,
        avatar_url,
        githubId: githubId,
      },
    });

    // 유저에게 토큰을 전달한다.
    res.redirect(
      `${process.env.CLIENT_PRODUCTION_URL}/login?token=${accessToken}`
    );
  } catch (e) {
    return res.redirect(`${process.env.CLIENT_PRODUCTION_URL}/authError`);
  }
};

export default callback;
