import auth from './user/auth';
import callback from './user/callback';
import logout from './user/logout';
import userInfo from './user/userInfo';
import editQuestion from './question/editQuestion';
import getQuestion from './question/getQuestion';
import questionDetail from './question/questionDetail';
import sendGpt from './getGpt/interviewSet';
import answerCheck from './getGpt/answerCheck';
import tokenCheck from './user/tokenCheck';
import addAnswer from './question/addAnswer';
import test from './getGpt/test';
const controller = {
  auth,
  callback,
  logout,
  userInfo,
  editQuestion,
  getQuestion,
  questionDetail,
  sendGpt,
  answerCheck,
  tokenCheck,
  addAnswer,
  test,
};
export default controller;
