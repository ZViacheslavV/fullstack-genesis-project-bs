import {
  changePassword,
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  requestResetPasswordEmail,
  resetPassword,
} from '../services/auth.js';
import { clearSession, setSessionCookies } from '../utils/authHelpers.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const { session, user } = await loginUser(req.body);

  setSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: user,
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (sessionId) await logoutUser(sessionId, refreshToken);

  clearSession(res);

  res.status(204).send();
};

export const refreshSessionController = async (req, res) => {
  try {
    const { sessionId, refreshToken } = req.cookies;
    const session = await refreshSession(sessionId, refreshToken);

    setSessionCookies(res, session);

    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      /* data:{} */
    });
  } catch (err) {
    clearSession(res);

    throw err;
  }
};

export const requestResetPasswordEmailController = async (req, res, next) => {
  try {
    await requestResetPasswordEmail(req.body.email);

    res.json({
      status: 200,
      message: 'Електронний лист для скидання пароля успішно надіслано!',
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    await resetPassword(req.body);

    res.json({
      status: 200,
      message: 'Пароль було успішно змінено!',
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

export const changePasswordController = async (req, res, next) => {
  try {
    await changePassword({
      userId: req.user._id,
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword,
    });

    res.json({
      status: 200,
      message: 'Пароль було успішно змінено!',
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
