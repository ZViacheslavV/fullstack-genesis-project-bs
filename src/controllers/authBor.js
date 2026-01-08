import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  requestResetPasswordEmail,
  resetPassword,
} from '../service/auth.js';
import { clearSession, setupSession } from '../utils/authHelpersBor.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(session, res);

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshSessionController = async (req, res) => {
  try {
    const session = await refreshSession(
      req.cookies.sessionId,
      req.cookies.refreshToken,
    );

    setupSession(session, res);

    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    clearSession(res);

    throw error;
  }
};

export const logoutController = async (req, res) => {
  await logoutUser(req.cookies.sessionId, req.cookies.refreshToken);

  clearSession(res);

  res.status(204).send();
};

export const requestResetPasswordEmailController = async (req, res) => {
  await requestResetPasswordEmail(req.body.email);

  res.json({
    status: 200,
    message: 'Reset password email is sent!',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.json({
    status: 200,
    message: 'Password was successfully reset!',
    data: {},
  });
};
