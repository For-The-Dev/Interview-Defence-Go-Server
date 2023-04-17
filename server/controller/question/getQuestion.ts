import { QueryTypes } from 'sequelize';
import db from '../../models/index';
import checkUserTable from '../../utils/checkUserTable';
import { Request, Response } from 'express';

interface TotalCount {
  count: number;
}

const getQuestion = async (req: Request, res: Response) => {
  // 유저에 관한 토큰이 있는 지 나중에 확인해야함.
  // 해당 토큰을 확인하고 나서 해당 테이블에 이름을 가진 db에 저장하기
  // ?page=1&limit=10
  const { page, limit } = req.query;

  if (!page || !limit) return res.status(400).send('필요한 데이터가 존재하지 않습니다.');

  let offset = 0;
  if (+page > 1) {
    offset = +limit * (+page - 1);
  }
  const { userId } = res.locals.userInfo;
  try {
    // 유저 검증 로직
    const tableName = await checkUserTable(userId);

    // 유저가 작성한 답변+질문 개수. 전체 개수를 보여주는 데 필요함.
    const getTotalCount = (await db.sequelize.query(`SELECT COUNT(*) as count FROM '${tableName}'`, {
      type: QueryTypes.SELECT,
    })) as TotalCount[];

    // 동적으로 생성한 테이블은 ORM 이용 불가함.
    const paginationQuery = `
      SELECT *
      FROM '${tableName}'
      ORDER BY id DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const result = await db.sequelize.query(paginationQuery, {
      type: QueryTypes.SELECT,
    });

    // 유저 테이블에 데이터를 보내줘야함. 조건은 페이지네이션 조건을 이용
    res.json({
      data: result,
      total: {
        page,
        limit,
        totalCount: getTotalCount.length > 0 ? getTotalCount[0].count : 0,
      },
    });
  } catch (e) {
    res.status(400).send('bad Request');
  }
};

export default getQuestion;
