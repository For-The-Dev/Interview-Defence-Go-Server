import { QueryTypes } from 'sequelize';
import db from '../models/index';

const getHasTable = async (userId: string) => {
  try {
    const findTable = await db.sequelize.query(`SELECT name FROM sqlite_master WHERE type='table' AND name='${userId}';`, {
      type: QueryTypes.SELECT,
    });

    // findTable = [ { name: 'hasdis' } ] 테이블이 존재하면 해당 형태로 반환된다.
    if (findTable.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (e: any) {
    throw new Error(e);
  }
};
// 테이블이 존재하는지 확인합니다.
export default getHasTable;
