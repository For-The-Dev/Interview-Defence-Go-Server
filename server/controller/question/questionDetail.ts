import { QueryTypes } from 'sequelize';
import db from '../../models/index';
import checkUserTable from '../../utils/checkUserTable';
import { Request, Response } from 'express';

interface TotalCount {
  count: number;
}

const questionDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  if (!id || !authorization) return res.status(400).send('bad request');
  // 데이터를 한가지만 찾을때는 findOne을 사용한다. model.테이블명.findOne({ 조건 })
  //  {안에 조건을 써준다. where : { id }} 여기서 id는 컬럼에 id가 params에 아이디랑 같은 것을 찾는 것.
  try {
    const tableName = await checkUserTable(authorization);

    const getTotalCount = (await db.sequelize.query(`SELECT COUNT(*) as count FROM '${tableName}'`, {
      type: QueryTypes.SELECT,
    })) as TotalCount[];

    if (getTotalCount.length > 0 && getTotalCount[0].count < +id) return res.status(400).send('데이터 수를 초과하였습니다.');
    const detailQuery = `
    SELECT * FROM '${tableName}' WHERE id=${id}
    `;
    const getDetails = await db.sequelize.query(detailQuery, {
      type: QueryTypes.SELECT,
    });

    res.send(getDetails[0]);
  } catch (e) {
    res.status(401).send('UnAuthorized');
  }
};

export default questionDetail;
