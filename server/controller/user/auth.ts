import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();

const auth = async (req: Request, res: Response) => {
  const github = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: `${process.env.SERVER_URL}/callback`,
  };
  const githubAuthUrl =
    'https://github.com/login/oauth/authorize?client_id=' +
    github.clientID +
    '&redirect_uri=' +
    github.redirectUri;
  res.redirect(githubAuthUrl);
};

export default auth;
