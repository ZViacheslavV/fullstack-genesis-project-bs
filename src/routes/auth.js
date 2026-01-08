import { celebrate } from 'celebrate';
import { Router } from 'express';

import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  celebrate(registerUserSchema),
  registerUserController,
);

authRouter.post('/auth/login', celebrate(loginUserSchema), loginUserController);

authRouter.post('/auth/logout', logoutUserController);

authRouter.post('/auth/refresh', refreshSessionController);

export default authRouter;
