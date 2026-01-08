import {
  getBabyService,
  getDemoInfo,
  getMomService,
  getWeeksService,
} from '../services/weeks.js';

export const getDemoController = async (req, res, next) => {
  const data = await getDemoInfo();

  res.json({
    status: 200,
    message: `Successfully found demo info`,
    data,
  });
};

export const getWeeksController = async (req, res, next) => {
  const data = await getWeeksService(req.user);
  res.json({
    status: 200,
    message: `Successfully found info`,
    data,
  });
};

export const getBabyController = async (req, res) => {
  const data = await getBabyService(req.params.weekNumber, req.user);

  res.status(200).json({
    status: 200,
    message: 'Successfully received baby info',
    data,
  });
};

export const getMomController = async (req, res) => {
  const data = await getMomService(req.params.weekNumber, req.user);

  res.status(200).json({
    status: 200,
    message: 'Successfully received mom info',
    data,
  });
};
