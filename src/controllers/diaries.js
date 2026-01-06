import Diary from '../models/diaries.js';

/*Створити щоденник*/
export const createDiary = async (req, res, next) => {
  try {
    const diary = await Diary.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json(diary);
  } catch (error) {
    next(error);
  }
};

/*Отримати щоденник*/
export const getDiaries = async (req, res, next) => {
  try {
    const diaries = await Diary.find({ owner: req.user._id });
    res.json(diaries);
  } catch (error) {
    next(error);
  }
};

/*Оновити щоденник*/
export const updateDiary = async (req, res, next) => {
  try {
    const diary = await Diary.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true },
    );

    if (!diary) {
      return res.status(404).json({ message: 'Щоденник не знайдено' });
    }

    res.json(diary);
  } catch (error) {
    next(error);
  }
};

/*Видалити щоденник*/
export const deleteDiary = async (req, res, next) => {
  try {
    const diary = await Diary.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!diary) {
      return res.status(404).json({ message: 'Diary not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
