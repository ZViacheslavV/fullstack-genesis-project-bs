import { Router } from 'express';
import usersRouter from './user.js';
import tasksRouter from './tasks.js';
import diariesRouter from './diaries.js';
import weeksRouter from './weeks.js';
// import authRouter from './authDan.js';
import authRouter from './auth.js';
import emotionsRouter from './emotions.js';
import authGoogleRouter from './authGoogle.js';

const router = Router();

router.use(authRouter);
router.use(authGoogleRouter);
router.use(usersRouter);
router.use(tasksRouter);
router.use(diariesRouter);
router.use(weeksRouter);
router.use(emotionsRouter);

export default router;
