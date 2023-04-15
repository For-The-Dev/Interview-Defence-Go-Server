import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import db from './models/index';
import indexRouter from './routes/index';
import userRouter from './routes/user';
import gptRouter from './routes/gpt';

dotenv.config();

// 서버 제작
const app = express();

// 동작 포트
const port = 8080;

const corsOptions = {
  /* TODO: CORS 설정이 필요합니다. 클라이언트가 어떤 origin인지에 따라 달리 설정할 수 있습니다.
   * 메서드는 GET, POST, OPTIONS, DELETE를 허용합니다.
   */
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  credentials: true,
};

app.use(express.urlencoded({ extended: false }));
// json 형식의 데이터를 처리할 수 있는 코드
app.use(express.json());
app.use(cors(corsOptions));

// github, 로그인 로그아웃 로직
app.use('/', indexRouter);
// 질문 작성, 유저 정보, 유저 질문 조회 관련 로직
app.use('/user', userRouter);
// 서버가 대기중 서버가 요청을 기다린다. 즉 서버가 켜졋다.
app.use('/gpt', gptRouter);

app.listen(port, () => {
  // 데이터베이스와의 동기화?
  db.sequelize
    .sync()
    .then(() => {
      console.log('db fin');
    })
    .catch((err: any) => {
      console.log(err);
      // 문제 생기면 프로세스 종료
      process.exit();
    });
});
