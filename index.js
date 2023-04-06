const express = require('express');
const cors = require('cors');
const models = require('./models');

// 서버 제작
const app = express();

// 동작 포트
const port = 8080;

// json 형식의 데이터를 처리할 수 있는 코드
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hi');
});

// 전체 조회
// 들어온 요청을 통해 express는 서버와 소통한다로 생각할 것
app.get('/products', (req, res) => {
  /*
    findAll 내에 객체로 조건을 집어 넣을 수 있음
    findAll({limit : 100}) , order을 통해 기준을 잡고 해당 기준을 오름차순 내림차순으로 정렬해서 내보낼 수 있음
    attributes 를 통해 필요한 정보만을 뽑아올 수 있음
  */
  models.Product.findAll({ order: [['createdAt', 'DESC']], attributes: ['id', 'name', 'price'] })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// 상품 생성
app.post('/products', (req, res) => {
  // 요청 바디에 접근할 수있음
  const data = req.body;
  const { name, description, price, seller, imageUrl } = data;
  if (!name || !description || !price || !seller || !imageUrl) res.status(406).send('모든 정보를 요청해주세요');
  // post 요청이 오면 데이터를 확인해서 db에 데이터를 저장한다. 비동기 방식으로 동작한다. models.테이블명.create({ 추가할 데이터 })
  models.Product.create({
    ...data,
  })
    .then((result) => {
      res.send({
        result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 상세 조회
// :를 통해 동적 라우팅 가능 : 이후에 고유값으로 들어옴. req.params로 접근 가능
app.get('/products/:id', (req, res) => {
  const { id } = req.params;

  // 데이터를 한가지만 찾을때는 findOne을 사용한다. model.테이블명.findOne({ 조건 })
  //  {안에 조건을 써준다. where : { id }} 여기서 id는 컬럼에 id가 params에 아이디랑 같은 것을 찾는 것.
  models.Product.findOne({
    where: {
      id,
    },
  })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, () => {
  console.log('server On');
  // 데이터베이스와의 동기화?
  models.sequelize
    .sync()
    .then(() => {
      console.log('db fin');
    })
    .catch((err) => {
      console.log(err);
      // 문제 생기면 프로세스 종료
      process.exit();
    });
});
