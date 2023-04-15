import dotenv from 'dotenv';
dotenv.config();
const axios = require('axios');
import { Request, Response } from 'express';
const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  try {
    const logout = await axios.delete(`https://api.github.com/applications/${CLIENT_ID}/token`, {
      data: {
        access_token: token,
      },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    });
    console.log('로그아웃 성공');
    res.status(205).send('Successfuly Logged Out');
  } catch (e) {
    console.log('에러남');
    res.send(e);
  }
};

export default logout;
