import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { UsersCollection } from '../models/user.js';

export const getCurrentUser = async (req, res) => {
  res.status(200).json(req.user);
};

export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }

  const result = await saveFileToCloudinary(req.file.buffer, req.user._id);

  const updateUser = await UsersCollection.findByIdAndUpdate(
    req.user._id,
    { avatar: result.secure_url },
    { new: true },
  );

  res.status(200).json({ avatar: updateUser.avatar });
};

export const updateCurrentUser = async (req, res) => {
  const user = await UsersCollection.findOneAndUpdate(
    { _id: req.user._id },
    req.body,
    {
      new: true,
    },
  );

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};
