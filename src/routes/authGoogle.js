import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { googleAuthController } from '../controllers/authGoogle.js';

const router = Router();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/api/auth/google/callback'
);

router.get('/auth/google', (req, res) => {
  const url = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['email', 'profile'],
    prompt: 'consent',
  });

  res.redirect(url);
});

router.get('/auth/google/callback', async (req, res) => {
  res.json({
    message: 'Google callback received',
    code: req.query.code,
  });
});


router.post('/auth/google', googleAuthController);

export default router;