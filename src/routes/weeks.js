import { Router } from 'express';
import {
  getBabyController,
  getDemoController,
  getMomController,
  getWeeksController,
} from '../controllers/weeks.js';
// import { authenticate } from '../middlewares/authenticate.js'; //TODO auth

const weeksRouter = Router();

weeksRouter.get('/weeks/demo', getDemoController);

// weeksRouter.use('/weeks', authenticate); //TODO auth

weeksRouter.get('/weeks', getWeeksController);
weeksRouter.get('/weeks/baby/:weekNumber', getBabyController);
weeksRouter.get('/weeks/mom/:weekNumber', getMomController);

export default weeksRouter;
