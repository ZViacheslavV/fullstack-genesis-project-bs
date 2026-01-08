import { Router } from 'express';
import { getAllEmotionsController } from '../controllers/emotions.js';

const emotionsRouter = Router();

emotionsRouter.get('/emotions', getAllEmotionsController);

export default emotionsRouter;
