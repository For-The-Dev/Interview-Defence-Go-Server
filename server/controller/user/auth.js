require('dotenv').config();

module.exports = async (req, res) => {
  const github = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:8080/callback',
  };
  const githubAuthUrl = 'https://github.com/login/oauth/authorize?client_id=' + github.clientID + '&redirect_uri=' + github.redirectUri;
  res.redirect(githubAuthUrl);
};
