import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createDiaryValidation,
  updateDiaryValidation,
} from '../validation/diaries.js';
import {
  createDiary,
  getDiaries,
  updateDiary,
  deleteDiary,
} from '../controllers/diaries.js';

const diariesRouter = Router();

diariesRouter.use(authenticate);

diariesRouter.post('/', createDiaryValidation, createDiary);
diariesRouter.get('/', getDiaries);
diariesRouter.patch('/:id', updateDiaryValidation, updateDiary);
diariesRouter.delete('/:id', deleteDiary);

export default diariesRouter;
