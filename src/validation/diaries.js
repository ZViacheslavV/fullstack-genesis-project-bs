import { celebrate, Joi, Segments } from 'celebrate';
import { Types } from 'mongoose';

const objectId = (value, helpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.message('"{{#label}}" must be a valid ObjectId');
  }
  return value;
};

export const createDiaryValidation = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64).required(),

    description: Joi.string().min(1).max(1000).required(),

    date: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .default(() => new Date().toISOString().split('T')[0]),

    emotions: Joi.array()
      .items(Joi.string().custom(objectId))
      .min(1)
      .max(12)
      .required(),
  }),
});

export const updateDiaryValidation = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64),
    description: Joi.string().min(1).max(1000),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
    emotions: Joi.array().items(Joi.string().custom(objectId)).min(1).max(12),
  }).min(1),
});
