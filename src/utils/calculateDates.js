import {
  DEFAULT_DAYS_LEFT,
  DEMO_WEEKS,
  MS_IN_DAY,
  TOTAL_DAYS,
} from '../constants/times.js';
import { getDemoInfo } from '../services/weeks.js';

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

export const calcDemoWeek = () => {
  const weekNumber = DEMO_WEEKS[Math.floor(Math.random() * DEMO_WEEKS.length)];
  const daysLeftToBirth = (42 - weekNumber) * 7;

  return { weekNumber, daysLeftToBirth };
};

export const calcCurrentWeekFromUser = (user) => {
  if (!user?.dueDate) return getDemoInfo();
  console.log(user?.dueDate);
  const today = new Date();
  const dueDate = new Date(user.dueDate);

  const daysLeftToBirth = Math.max(0, Math.ceil((dueDate - today) / MS_IN_DAY));
  const weekNumber = Math.min(
    42,
    Math.max(1, 42 - Math.floor(daysLeftToBirth / 7)),
  );

  return { weekNumber, daysLeftToBirth };
};
