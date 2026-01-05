import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { ENV_VARS } from './constants/envVars.js';
import router from './routes/index.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import { logger } from './middlewares/logger.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { generateRequestId } from './middlewares/generateRequestIdMiddleware.js';
import { notFoundHandlerMiddleware } from './middlewares/notFoundHandlerMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { UPLOAD_DIR } from './constants/path.js';

export const startServer = () => {
  const app = express();

  app.use(
    logger,
    cors(),
    cookieParser(),
    json({
      type: ['application/vnd.api+json', 'application/json'],
      limit: '100kb',
    }),
    generateRequestId,
  );

  app.use(router);

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(notFoundHandlerMiddleware);

  app.use(errors());

  app.use(errorHandlerMiddleware);

  const PORT = getEnvVar(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};
