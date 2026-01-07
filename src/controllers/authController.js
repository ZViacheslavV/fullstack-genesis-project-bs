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

    res.status(201).json({ newUser });
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

    await SessionsCollection.deleteOne({ userId: user._id });

    const newSession = await createSession(user._id);

    setSessionCookies(res, newSession);

    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
