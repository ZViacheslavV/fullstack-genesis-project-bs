import { Router } from 'express';
import { getDemoController } from '../controllers/weeks.js';

const weeksRouter = Router();

weeksRouter.get('/api/weeks/demo', getDemoController);

export default weeksRouter;

//TODO routes?
