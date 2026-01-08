import { Router } from 'express';
import authRouter from './authOld.js';
import usersRouter from './user.js';
import tasksRouter from './tasks.js';
import diariesRouter from './diaries.js';
import weeksRouter from './weeks.js';

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(tasksRouter);
router.use('/diaries', diariesRouter);
router.use(tasksRouter);
//router.use(diariesRouter);
router.use(weeksRouter);

export default router;
