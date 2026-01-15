import createHttpError from 'http-errors';
// import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import {
  // FIFTEEN_MINUTES,//TODO return 15 mins
  ONE_DAY,
  THIRTY_SECONDS,
} from '../constants/times.js';
import { SessionsCollection } from '../models/session.js';
import { UsersCollection } from '../models/user.js';

const createSession = (userId) => ({
  userId,
  accessToken: crypto.randomBytes(30).toString('base64'),
  refreshToken: crypto.randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(
    Date.now() + THIRTY_SECONDS /* FIFTEEN_MINUTES */,
  ), //TODO return 15 mins
  refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
});

export const registerUser = async (payload) => {
  const existingUser = await UsersCollection.findOne({ email: payload.email });

  if (existingUser) throw createHttpError(409, 'Email is in use.');

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await UsersCollection.create({
    ...payload,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (payload) => {
  const existingUser = await UsersCollection.findOne({ email: payload.email });

  if (!existingUser) throw createHttpError(401, 'Credentials are invalid');

  const validPassword = await bcrypt.compare(
    payload.password,
    existingUser.password,
  );

  if (!validPassword) throw createHttpError(401, 'Credentials are invalid');

  await SessionsCollection.findOneAndDelete({ userId: existingUser._id });

  const session = await SessionsCollection.create(
    createSession(existingUser._id),
  );

  return { session, existingUser };
};

export const logoutUser = async (sessionId, refreshToken) => {
  await SessionsCollection.findOneAndDelete({ _id: sessionId, refreshToken });
};

export const refreshSession = async (sessionId, refreshToken) => {
  try {
    const session = await SessionsCollection.findOne({
      _id: sessionId,
      refreshToken,
    });

    if (!session) throw createHttpError(401, 'Your session not found');

    if (session.refreshTokenValidUntil < new Date())
      throw createHttpError(401, 'Session expired');

    const user = await UsersCollection.findById(session.userId);

    if (!user) throw createHttpError(401, 'User, your session not found');

    await SessionsCollection.findOneAndDelete({ _id: sessionId, refreshToken });

    const newSession = await SessionsCollection.create(createSession(user._id));

    return newSession;
  } catch (err) {
    await SessionsCollection.findOneAndDelete({ _id: sessionId, refreshToken });
    throw err;
  }
};
