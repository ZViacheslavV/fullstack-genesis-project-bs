import createHttpError from 'http-errors';

export const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const message = error.details.map((d) => d.message).join(', ');
    return next(createHttpError(400, message));
  }

  next();
};
