import { Router } from 'express';
import controller from '../controller';
import { Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return res.send('hi');
});

router.get('/auth/github', controller.auth);
router.get('/callback', controller.callback);
router.get('/logout', controller.logout);

export default router;
