import { Joi, Segments } from 'celebrate';
import { FORTY_WEEKS, ONE_WEEK } from '../constants/times.js';
import { GENDERS } from '../constants/genders.js';

export const updateCurrentUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(32),
    email: Joi.string().email().max(64),
    gender: Joi.string().valid(...Object.values(GENDERS)),
    dueDate: Joi.date()
      .min(new Date(Date.now() + ONE_WEEK))
      .max(new Date(Date.now() + FORTY_WEEKS)),
  }).min(1),
};
