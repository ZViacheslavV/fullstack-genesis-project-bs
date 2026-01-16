import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';

import { UsersCollection } from '../models/user.js';
import { SessionsCollection } from '../models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/times.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createSession = (userId) => ({
  userId,
  accessToken: crypto.randomBytes(30).toString('base64'),
  refreshToken: crypto.randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
  refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
});

export const googleAuthService = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const {
    email,
    name,
    picture,
  } = payload;

  let user = await UsersCollection.findOne({ email });

  if (!user) {
    user = await UsersCollection.create({
      email,
      name,
      photo: picture,
      password: crypto.randomBytes(16).toString('hex'), // заглушка
    });
  }
  await SessionsCollection.findOneAndDelete({ userId: user._id });

  const session = await SessionsCollection.create(
    createSession(user._id)
  );

  return session;
};