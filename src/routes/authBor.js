import { Router } from 'express';
import {
  loginUserController,
  logoutController,
  refreshSessionController,
  registerUserController,
  /*   requestResetPasswordEmailController,
  resetPasswordController, */
} from '../controllers/authBor.js';
// import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { celebrate } from 'celebrate';
// import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
// import { requestResetPasswordValidationSchema } from '../validation/requestResetPasswordEmailValidationSchema.js';
// import { resetPasswordValidationSchema } from '../validation/resetPasswordValidationSchema.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  celebrate(registerUserSchema),
  registerUserController,
);
authRouter.post('/auth/login', celebrate(loginUserSchema), loginUserController);
authRouter.post('/auth/logout', logoutController);
authRouter.post('/auth/refresh', refreshSessionController);

/* authRouter.post(
  '/auth/request-reset-password-email',
  celebrate(requestResetPasswordValidationSchema),
  requestResetPasswordEmailController,
);
authRouter.post(
  '/auth/reset-password',
  celebrate(resetPasswordValidationSchema),
  resetPasswordController,
); */

export default authRouter;
