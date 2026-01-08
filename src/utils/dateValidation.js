import { FORTY_WEEKS, ONE_WEEK } from '../constants/times.js';

export const isValidYYYYMMDD = (value) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
};

export const isDateInRange = (value) => {
  if (!value) return true;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;

  const now = new Date();
  const minDate = new Date(now.getTime() + ONE_WEEK);
  const maxDate = new Date(now.getTime() + FORTY_WEEKS);

  return date >= minDate && date <= maxDate;
};
