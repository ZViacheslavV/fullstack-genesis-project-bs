import { Joi, Segments } from 'celebrate';
import { GENDERS } from '../constants/genders.js';
import { isDateInRange, isValidYYYYMMDD } from '../utils/dateValidation.js';

export const updateCurrentUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(32),
    email: Joi.string().email().max(64),
    gender: Joi.string().valid(...Object.values(GENDERS)),

    dueDate: Joi.string()
      .custom((value, helpers) => {
        if (value == null) return value;

        if (!isValidYYYYMMDD(value)) {
          return helpers.error('any.invalid');
        }

        if (!isDateInRange(value)) {
          return helpers.error('date.outOfRange');
        }

        return value;
      })
      .messages({
        'any.invalid': 'dueDate must be in YYYY-MM-DD format',
        'date.outOfRange':
          'dueDate must be between 1 and 40 weeks from the current date',
      }),
  }).min(1),
};

/* import { Joi, Segments } from 'celebrate';
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
 */
