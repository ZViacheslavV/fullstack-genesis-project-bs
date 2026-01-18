import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';

import { googleAuthService } from '../services/authGoogle.js';
import { setSessionCookies } from '../utils/authHelpers.js';

const router = Router();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.BACKEND_URL}/api/auth/google/callback`
);


router.get('/auth/google', (req, res) => {
  const url = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['email', 'profile'],
    prompt: 'consent',
  });

  res.redirect(url);
});

router.get('/auth/google/callback', async (req, res, next) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: 'Code is missing' });
    }

    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    if (!tokens.id_token) {
      return res.status(400).json({ message: 'id_token is missing' });
    }

    const session = await googleAuthService(tokens.id_token);

    setSessionCookies(res, session);

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    next(error);
  }
});

export default router;
