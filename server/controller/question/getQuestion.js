const models = require('../../models');
const checkUserTable = require('../../utils/checkUserTable');

module.exports = async (req, res) => {
  // 유저에 관한 토큰이 있는 지 나중에 확인해야함.
  // 해당 토큰을 확인하고 나서 해당 테이블에 이름을 가진 db에 저장하기
  // ?page=1&limit=10
  const { page, limit } = req.query;
  const { authorization } = req.headers;
  if (!page | !authorization | !limit) return res.status(400).send('필요한 데이터가 존재하지 않습니다.');

  let offset = 0;
  if (page > 1) {
    offset = limit * (page - 1);
  }

  try {
    // 유저 검증 로직
    const tableName = await checkUserTable(authorization);

    // 유저가 작성한 답변+질문 개수. 전체 개수를 보여주는 데 필요함.
    const getTotalCount = await models.sequelize.query(`SELECT COUNT(*) as count FROM '${tableName}'`, {
      type: models.Sequelize.QueryTypes.SELECT,
    });

    // 동적으로 생성한 테이블은 ORM 이용 불가함.
    const paginationQuery = `
      SELECT *
      From '${tableName}'
      ORDER BY id DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const result = await models.sequelize.query(paginationQuery, {
      type: models.Sequelize.QueryTypes.SELECT,
    });

    // 유저 테이블에 데이터를 보내줘야함. 조건은 페이지네이션 조건을 이용
    res.json({
      data: result,
      total: {
        page,
        limit,
        totalCount: getTotalCount[0].count,
      },
    });
  } catch (e) {
    res.status(400).send('Error: ' + e.message);
  }
};
