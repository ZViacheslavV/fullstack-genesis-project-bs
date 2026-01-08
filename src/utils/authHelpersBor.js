export const clearSession = (res) => {
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
};

export const setupSession = (session, res) => {
  res.cookie('refreshToken', session.refreshToken, {
    secure: true,
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    secure: true,
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};
