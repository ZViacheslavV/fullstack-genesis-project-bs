import createHttpError from 'http-errors';
import { BabyStatesCollection } from '../models/babyStates.js';
import { calcDaysLeftToBirth, calcCurWeek } from '../utils/calculateDates.js';

export const getMyDay = async (estimateBirthDate) => {
  if (!estimateBirthDate)
    throw createHttpError(400, 'estimateBirthDate is required');

  const daysLeftToBirth = calcDaysLeftToBirth(estimateBirthDate);
  const currentWeek = calcCurWeek(daysLeftToBirth);

  const babyState = await BabyStatesCollection.findOne({
    weekNumber: currentWeek,
  });

  if (!babyState)
    throw createHttpError(404, `Baby state not found for week ${currentWeek}`);

  const {
    _id,
    weekNumber,
    babySize,
    babyWeight,
    image,
    babyActivity,
    babyDevelopment,
    momDailyTips,
  } = babyState;

  return {
    _id,
    daysLeftToBirth,
    weekNumber,
    babySize,
    babyWeight,
    image,
    babyActivity,
    babyDevelopment,
    momDailyTips,
  };
};
