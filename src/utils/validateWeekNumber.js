import createHttpError from 'http-errors';

export const validateWeekNumber = (weekNum) => {
  const weekNumber = Number(weekNum);

  if (weekNumber < 1 || weekNumber > 42)
    throw createHttpError(400, 'Not valid week number');

  return weekNumber;
};
