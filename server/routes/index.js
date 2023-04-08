const express = require('express');
const controller = require('../controller');

const router = express.Router();

router.get('/', (req, res) => {
  return res.send('hi');
});

router.get('/auth/github', controller.auth);
router.get('/callback', controller.callback);
router.get('/logout', controller.logout);

module.exports = router;
