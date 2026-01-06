import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createDiary,
  getDiaries,
  updateDiary,
  deleteDiary,
} from '../controllers/diaries.js';

const diariesRouter = Router();

diariesRouter.use(authenticate);

diariesRouter.post('/', createDiary);
diariesRouter.get('/', getDiaries);
diariesRouter.patch('/:id', updateDiary);
diariesRouter.delete('/:id', deleteDiary);

export default diariesRouter;
