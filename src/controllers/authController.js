import createHttpError from 'http-errors';
import { UsersCollection } from '../models/user.js';
import bcrypt from 'bcrypt';
import { createSession, setSessionCookies } from '../services/auth.js';
import { SessionsCollection } from '../models/session.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await UsersCollection.findOne({ email });
    if (userExists) {
      return next(createHttpError(400, 'Email is in use'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UsersCollection.create({
      name,
      email,
      password: hashedPassword,
    });

    const newSession = await createSession(newUser._id);

    setSessionCookies(res, newSession);

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: {
        newUser,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UsersCollection.findOne({ email });
    if (!user) {
      return next(createHttpError(401, 'Invalid credentials!'));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(createHttpError(401, 'Invalid credentials!'));
    }

    await SessionsCollection.deleteMany({ userId: user._id });

    const newSession = await createSession(user._id);

    setSessionCookies(res, newSession);

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in a user!',
      data: {
        user,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await SessionsCollection.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserSession = async (req, res, next) => {
  try {
    const session = await SessionsCollection.findOne({
      _id: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

    if (!session) {
      next(createHttpError(401, 'Session not found'));
    }

    const isSessionTokenExpired = new Date() > session.refreshTokenValidUntil;

    if (isSessionTokenExpired) {
      next(createHttpError(401, 'Session token expired'));
    }

    await SessionsCollection.deleteOne({
      _id: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

    const newSession = await createSession(session.userId);
    setSessionCookies(res, newSession);

    res.status(200).json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
