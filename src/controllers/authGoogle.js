import { googleAuthService } from '../services/authGoogle.js';
import { setSessionCookies } from '../utils/authHelpers.js';

export const googleAuthController = async (req, res, next) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        message: 'Google idToken is required',
      });
    }

    const session = await googleAuthService(idToken);

    setSessionCookies(res, session);

    res.status(200).json({
      user: session.userId,
    });
  } catch (error) {
    next(error);
  }
};