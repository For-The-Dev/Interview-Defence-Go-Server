import { Router } from 'express';
import controller from '../controller';

const router = Router();

// 유저 정보 조회
router.get('/', controller.tokenCheck, controller.userInfo);

// 유저가 했던 질문 전체 조회
router.get('/questions', controller.tokenCheck, controller.getQuestion);

// 유저가 수정하기 위해 디테일에 접근하기
router.get('/question/:id', controller.tokenCheck, controller.questionDetail);

// 유저가 질문+답변 등록하기, 등록 후엔 답변을 체크해서 보냄
router.post('/editQuestion', controller.tokenCheck, controller.editQuestion, controller.answerCheck);

export default router;
