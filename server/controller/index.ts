import auth from './user/auth';
import callback from './user/callback';
import logout from './user/logout';
import userInfo from './user/userInfo';
import editQuestion from './question/editQuestion';
import getQuestion from './question/getQuestion';
import questionDetail from './question/questionDetail';
import sendGpt from './getGpt/interviewSet';
import answerCheck from './getGpt/answerCheck';
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
};

export default controller;
