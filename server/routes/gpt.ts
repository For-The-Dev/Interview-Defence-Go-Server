import { Router } from 'express';
import controller from '../controller';

const router = Router();

router.get('/interview', controller.tokenCheck, controller.sendGpt);

export default router;
