import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/path.js';

export const swaggerDocumentation = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch {
    throw createHttpError(500, 'Problem with loading swagger documentation');
  }
};
