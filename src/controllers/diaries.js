import * as diariesService from '../services/diaries.js';

/* Створити щоденник */
export const createDiary = async (req, res, next) => {
  try {
    const diary = await diariesService.createDiary({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json(diary);
  } catch (error) {
    next(error);
  }
};

/* Отримати щоденники */
export const getDiaries = async (req, res, next) => {
  try {
    const diaries = await diariesService.getDiariesByUser(req.user._id);
    res.json(diaries);
  } catch (error) {
    next(error);
  }
};

/* Оновити щоденник */
export const updateDiary = async (req, res, next) => {
  try {
    const diary = await diariesService.updateDiary(
      req.params.id,
      req.user._id,
      req.body,
    );

    if (!diary) {
      return res.status(404).json({ message: 'Щоденник не знайдено' });
    }

    res.json(diary);
  } catch (error) {
    next(error);
  }
};

/* Видалити щоденник */
export const deleteDiary = async (req, res, next) => {
  try {
    const diary = await diariesService.deleteDiary(req.params.id, req.user._id);

    if (!diary) {
      return res.status(404).json({ message: 'Щоденник не знайдено' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
