import { Router } from 'express';
import controller from '../controller';

const router = Router();

router.post('/interview', controller.sendGpt);

export default router;
