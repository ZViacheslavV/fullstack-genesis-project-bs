import { Router } from 'express';
import { authenticate } from '../middlewares/authenticateBor.js';
import { upload } from '../middlewares/multer.js';
import {
  getCurrentUser,
  updateCurrentUser,
  updateUserAvatar,
} from '../controllers/userControllers.js';
import { celebrate } from 'celebrate';
import { updateCurrentUserSchema } from '../validations/userValidation.js';

const userRouter = Router();

userRouter.get('/users/current', authenticate, getCurrentUser);

userRouter.patch(
  '/users/current/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

userRouter.patch(
  '/users/current',
  authenticate,
  celebrate(updateCurrentUserSchema),
  updateCurrentUser,
);

export default userRouter;
