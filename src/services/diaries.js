import Diary from '../models/diaries.js';

export const createDiary = async (data) => {
  return Diary.create(data);
};

export const getDiariesByUser = async (userId) => {
  return Diary.find({ owner: userId })
    .populate('emotions')
    .populate('owner', 'name email')
    .sort({ date: -1 });
};

export const getDiaryById = async (diaryId, userId) => {
  return Diary.findOne({ _id: diaryId, owner: userId })
    .populate('emotions')
    .populate('owner', 'name email');
};

export const updateDiary = async (diaryId, userId, data) => {
  return Diary.findOneAndUpdate({ _id: diaryId, owner: userId }, data, {
    new: true,
  });
};

export const deleteDiary = async (diaryId, userId) => {
  return Diary.findOneAndDelete({ _id: diaryId, owner: userId });
};
