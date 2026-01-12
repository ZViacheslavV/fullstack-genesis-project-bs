import createHttpError from 'http-errors';
import { BabyStatesCollection } from '../models/babyStates.js';
import {
  calcCurrentWeekFromUser,
  calcDemoWeek,
} from '../utils/calculateDates.js';
import { MomStatesCollection } from '../models/momStates.js';
import { validateWeekNumber } from '../utils/validateWeekNumber.js';
import { FIRST_WEEK, PRESUMABLE_DAYS } from '../constants/times.js';

export const getDemoInfo = async () => {
  const { weekNumber, daysLeftToBirth } = calcDemoWeek();

  const babyState = await BabyStatesCollection.findOne({ weekNumber });
  const momState = await MomStatesCollection.findOne({ weekNumber });

  if (!babyState || !momState)
    throw createHttpError(404, `No info found for week ${weekNumber}`);

  return { weekNumber, daysLeftToBirth, babyState, momState };
};

export const getWeeksService = async (user) => {
  if (!user) throw createHttpError(401, 'No user found, auth problem'); //TODO auth check

  let { weekNumber, daysLeftToBirth } = calcCurrentWeekFromUser(user);

  //if no dueDate
  if (!weekNumber || !daysLeftToBirth)
    [weekNumber, daysLeftToBirth] = [FIRST_WEEK, PRESUMABLE_DAYS];

  const babyState = await BabyStatesCollection.findOne({ weekNumber });
  const momState = await MomStatesCollection.findOne({ weekNumber });

  if (!babyState || !momState)
    throw createHttpError(404, `No info found for week ${weekNumber}`);

  return { weekNumber, daysLeftToBirth, babyState, momState };
};

export const getBabyService = async (weekNum, user) => {
  if (!user) throw createHttpError(401, 'No user found, auth problem'); //TODO auth check

  const weekNumber = weekNum
    ? validateWeekNumber(weekNum)
    : calcCurrentWeekFromUser(user);

  const babyState = await BabyStatesCollection.findOne({ weekNumber });
  if (!babyState) throw createHttpError(404, 'No info for babyState');

  return babyState;
};

export const getMomService = async (weekNum, user) => {
  if (!user) throw createHttpError(401, 'No user found, auth problem'); //TODO auth check

  const weekNumber = weekNum
    ? validateWeekNumber(weekNum)
    : calcCurrentWeekFromUser(user);

  const momState = await MomStatesCollection.findOne({ weekNumber });
  if (!momState) throw createHttpError(404, 'No info for momState');

  return momState;
};
