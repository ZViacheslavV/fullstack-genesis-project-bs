import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

const DATE_REGEXP = /^\d{4}-\d{2}-\d{2}$/;


export const createTaskSchema = {
    [Segments.BODY]: Joi.object({
        name: Joi.string().trim().min(1).max(96).required(),
        date: Joi.date().pattern(DATE_REGEXP).greater('now').required().messages({
                'string.pattern.base': 'Date format must be YYYY-MM-DD',
            }),
        isDone: Joi.boolean().default(false),
    })
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};
export const taskIdSchema = {
  [Segments.PARAMS]: Joi.object({
    taskId: Joi.string().trim().custom(objectIdValidator).required(),
  })
};

export const updateTaskStatusSchema = {
    ...taskIdSchema,
    [Segments.BODY]: Joi.object({
        isDone: Joi.boolean().required(),
    })
};