import { User } from '../models/user';

const checkUserTable = async (githubId: number) => {
  try {
    const findUser = await User.findOne({
      where: {
        githubId,
      },
    });
    // 유저 아이디를 반환함
    if (findUser) {
      return findUser.githubId;
    } else {
      throw new Error('User not found');
    }
  } catch (e: any) {
    throw new Error(e);
  }
};

export default checkUserTable;
