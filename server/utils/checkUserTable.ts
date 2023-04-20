import { User } from '../models/user';
import getUserInfo from './getUserInfo';

const checkUserTable = async (userId: string) => {
  try {
    const findUser = await User.findOne({
      where: {
        userId,
      },
    });
    // 유저 아이디를 반환함
    if (findUser) {
      return findUser.userId;
    } else {
      throw new Error('User not found');
    }
  } catch (e: any) {
    throw new Error(e);
  }
};

export default checkUserTable;
