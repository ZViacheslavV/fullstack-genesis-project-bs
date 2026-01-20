import nodemailer from 'nodemailer';
import { ENV_VARS } from '../constants/envVars.js';
import fs from 'node:fs';
import path from 'node:path';
import { TEMPLATE_DIR } from '../constants/path.js';
import Handlebars from 'handlebars';
import createHttpError from 'http-errors';

const transporter = nodemailer.createTransport({
  host: process.env[ENV_VARS.SMTP_HOST],
  port: process.env[ENV_VARS.SMTP_PORT],
  secure: true,
  auth: {
    user: process.env[ENV_VARS.SMTP_USER],
    pass: process.env[ENV_VARS.SMTP_PASSWORD],
  },
});

const resetPasswordTemplate = fs
  .readFileSync(path.join(TEMPLATE_DIR, 'request-reset-password-email.html'))
  .toString();

export const sendEmail = async (email, params) => {
  try {
    const template = Handlebars.compile(resetPasswordTemplate);
    const html = template({
      username: params.name,
      RESET_PASSWORD_URL: `${process.env[ENV_VARS.FRONTEND_DOMAIN]}/reset-password?token=${params.token}`,
    });

    console.log('Відправляємо лист на:', email);
    console.log(
      'Посилання для скидання паролю:',
      `${process.env[ENV_VARS.FRONTEND_DOMAIN]}/reset-password?token=${params.token}`,
    );

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Змініть свій пароль!',
      html,
    });

    console.log('Лист відправлено:', info.messageId);
  } catch (err) {
    console.error('Помилка надсилання листа:', err);
    throw createHttpError(
      500,
      'Не вдалося надіслати листа для скидання пароля',
    );
  }
};
