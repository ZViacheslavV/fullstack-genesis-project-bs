import {
  DEFAULT_DAYS_LEFT,
  DEMO_WEEKS,
  MS_IN_DAY,
  TOTAL_DAYS,
} from '../constants/times.js';

export const calcCurWeek = (daysLeft) =>
  Math.floor((TOTAL_DAYS - daysLeft) / 7) + 1;

export const calcDaysLeftToBirth = (estimateBirthDay) => {
  const date = new Date(estimateBirthDay);

  if (!estimateBirthDay || Number.isNaN(date.getTime()))
    return DEFAULT_DAYS_LEFT;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  return Math.ceil((date - today) / MS_IN_DAY);
};

export const calcDemoDaysLeft = () => {
  const weeks = DEMO_WEEKS[Math.floor(Math.random() * DEMO_WEEKS.length)];

  const result = new Date();
  result.setDate(result.getDate() + weeks * 7);

  return result.toISOString().slice(0, 10);
};

//TODO Recheck
