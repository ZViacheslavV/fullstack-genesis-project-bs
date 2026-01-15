import {
  // FIFTEEN_MINUTES, //TODO change back to 15 mins
  ONE_DAY,
  THIRTY_SECONDS,
} from '../constants/times.js';

export const setSessionCookies = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: THIRTY_SECONDS /* FIFTEEN_MINUTES */, //TODO change back to 15 mins
  });

  res.cookie('refreshToken', session.refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });

  res.cookie('sessionId', session._id, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });
};

export const clearSession = (res) => {
  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
};
