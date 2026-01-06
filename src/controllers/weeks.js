import { getMyDay } from '../services/weeks.js';
import { calcDemoDaysLeft } from '../utils/calculateDates.js';

export const getDemoController = async (req, res, next) => {
  const estimateBirthDate = calcDemoDaysLeft();
  const myDay = await getMyDay(estimateBirthDate);
  res.json({
    status: 200,
    message: `Successfully found my day info!`,
    data: myDay,
  });
};

//TODO Check
