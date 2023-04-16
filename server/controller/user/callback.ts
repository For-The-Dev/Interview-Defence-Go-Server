import dotenv from 'dotenv';
import axios from 'axios';
import db from '../../models/index';
import getUserInfo from '../../utils/getUserInfo';
import getHasTable from '../../utils/getHasTable';
import createQuestionTable from '../../utils/createQuestionTable';
import { Request, Response } from 'express';
import user from '../../models/user';

dotenv.config();
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

    const { userId, nickName, avatar_url } = await getUserInfo(accessToken);

    const hasTable = await getHasTable(userId);
    // 만약 해당 테이블이 존재하지 않는다면 회원가입이 진행되어야 하는 유저이다.
    if (!hasTable) {
      // 유저별 테이블 제작
      await createQuestionTable(userId);
      // 회원가입 유저 등록
      await user.create({
        userId,
        nickName,
        avatar_url,
      });
    }
    // 유저에게 토큰을 전달한다.
    res.redirect(`${process.env.CLIENT_URL}?token=${accessToken}`);
  } catch (e) {
    return res.redirect(`${process.env.CLIENT_URL}/authError`);
  }
};

export default callback;
