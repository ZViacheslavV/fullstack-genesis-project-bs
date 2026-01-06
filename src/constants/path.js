import path from 'node:path';

export const TEMPLATE_DIR = path.join(process.cwd(), 'templates');
export const UPLOAD_DIR = path.join(process.cwd(), 'upload');
export const TEMP_DIR = path.join(process.cwd(), 'temp');

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
