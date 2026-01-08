import { clearSession, setSessionCookies } from '../helper/authHelpers.js';
import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const [session, user] = await loginUser(req.body);

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
