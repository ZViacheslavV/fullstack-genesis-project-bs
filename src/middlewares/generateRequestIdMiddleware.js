export const generateRequestId = (req, res, next) => {
  req.id = crypto.randomUUID();
  next();
};
