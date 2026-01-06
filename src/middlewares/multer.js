import createHttpError from 'http-errors';
import multer from 'multer';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        createHttpError(
          400,
          'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.',
        ),
        false,
      );
    }
  },
});
