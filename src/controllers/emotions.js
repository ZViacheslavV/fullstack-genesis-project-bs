import Emotion from '../models/emotions.js';

export const getAllEmotionsController = async (req, res) => {
  const emotions = await Emotion.find({}, { title: 1 }).sort({ title: 1 });

  return res.status(200).json({
    status: 200,
    message: 'Received emotions list ',
    data: emotions,
  });
};
