import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
/* import jwt from 'jsonwebtoken'; */
import crypto from 'node:crypto';
/* import { sendResetPasswordEmail } from './email.js';
import { getEnvVar } from '../helper/getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js'; */
import { UsersCollection } from '../models/user.js';
import { SessionsCollection } from '../models/session.js';

const createSession = (userId) => ({
  userId,
  refreshToken: crypto.randomBytes(30).toString('base64'),
  accessToken: crypto.randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
  refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
});

export const registerUser = async (payload) => {
  const foundUser = await UsersCollection.findOne({ email: payload.email });

  if (foundUser)
    throw createHttpError(409, 'User with this email already exists');

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await UsersCollection.create({
    ...payload,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (payload) => {
  const foundUser = await UsersCollection.findOne({ email: payload.email });

  if (!foundUser) throw createHttpError(400, 'Credentials are invalid');

  const arePasswordsEqual = await bcrypt.compare(
    payload.password,
    foundUser.password,
  );

  if (!arePasswordsEqual) throw createHttpError(400, 'Credentials are invalid');

  await SessionsCollection.findOneAndDelete({ userId: foundUser._id });

  const session = await SessionsCollection.create(createSession(foundUser._id));

  return session;
};

export const refreshSession = async (sessionId, refreshToken) => {
  try {
    const session = await SessionsCollection.findOne({
      _id: sessionId,
      refreshToken,
    });

    if (!session) throw createHttpError(401, 'Session not found!');

    if (session.refreshTokenValidUntil < new Date())
      throw createHttpError(401, 'Session expired!');

    const user = await UsersCollection.findById(session.userId);

    if (!user) throw createHttpError(401, 'Session not found!');

    await SessionsCollection.findOneAndDelete({ _id: sessionId, refreshToken });

    const newSession = await SessionsCollection.create(createSession(user._id));

    return newSession;
  } catch (err) {
    await SessionsCollection.findOneAndDelete({ _id: sessionId, refreshToken });

    throw err;
  }
};

export const logoutUser = async (sessionId, refreshToken) => {
  await SessionsCollection.findOneAndDelete({ _id: sessionId, refreshToken });
};

/* export const requestResetPasswordEmail = async (email) => {
  const user = await UsersCollection.findOne({ email });

  if (!user) return;

  const token = jwt.sign(
    {
      sub: user._id,
      name: user.username,
      email: user.email,
    },
    getEnvVar(ENV_VARS.JWT_SECRET),
    {
      expiresIn: '15m',
    },
  );

  await sendResetPasswordEmail(email, { token, username: user.username });
}; */

/* export const resetPassword = async ({ token, password }) => {
  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, getEnvVar(ENV_VARS.JWT_SECRET));
  } catch (err) {
    throw createHttpError(401, err.message);
  }

  const user = await UsersCollection.findById(jwtPayload.sub);

  if (!user) throw createHttpError(401, 'Token is invalid!');

  await UsersCollection.findByIdAndUpdate(jwtPayload.sub, {
    password: await bcrypt.hash(password, 10),
  });

  await SessionsCollection.findOneAndDelete({ userId: user._id });
}; */
