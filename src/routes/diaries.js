import { validateBody } from '../middlewares/validateBody.js';
import { createDiarySchema } from '../validation/diaries.js';

import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { updateDiarySchema } from '../validation/diaries.js';
import {
  createDiary,
  getDiaries,
  updateDiary,
  deleteDiary,
} from '../controllers/diaries.js';

const diariesRouter = Router();

diariesRouter.use(authenticate);

diariesRouter.post('/', validateBody(createDiarySchema), createDiary);
diariesRouter.get('/', getDiaries);
diariesRouter.patch('/:id', validateBody(updateDiarySchema), updateDiary);
diariesRouter.delete('/:id', deleteDiary);

export default diariesRouter;
