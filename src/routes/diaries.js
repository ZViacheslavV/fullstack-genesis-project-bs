import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createDiaryValidation,
  updateDiaryValidation,
} from '../validations/diaries.js';
import {
  createDiary,
  getDiaries,
  updateDiary,
  deleteDiary,
} from '../controllers/diaries.js';

const diariesRouter = Router();

diariesRouter.use('/diaries', authenticate);

diariesRouter.post('/diaries', createDiaryValidation, createDiary);
diariesRouter.get('/diaries', getDiaries);
diariesRouter.patch('/diaries/:id', updateDiaryValidation, updateDiary);
diariesRouter.delete('/diaries/:id', deleteDiary);

export default diariesRouter;
