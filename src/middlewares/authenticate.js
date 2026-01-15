import createHttpError from 'http-errors';
import { SessionsCollection } from '../models/session.js';
import { UsersCollection } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) throw createHttpError(401, 'Missing access token');

  const session = await SessionsCollection.findOne({ accessToken });
  if (!session) throw createHttpError(401, 'Authenticate session not found ');

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) throw createHttpError(401, 'Access token expired');

  const user = await UsersCollection.findById(session.userId);
  if (!user)
    throw createHttpError(401, 'No session associated with this token found');

  req.user = user;

  next();
};
