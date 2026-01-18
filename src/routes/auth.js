import { celebrate } from 'celebrate';
import { Router } from 'express';

import {
  loginUserSchema,
  registerUserSchema,
  requestResetPasswordEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
  requestResetPasswordEmailController,
  resetPasswordController,
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

authRouter.post(
  '/auth/request-reset-password-email',
  celebrate(requestResetPasswordEmailSchema),
  requestResetPasswordEmailController,
);

authRouter.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPasswordController,
);

export default authRouter;
