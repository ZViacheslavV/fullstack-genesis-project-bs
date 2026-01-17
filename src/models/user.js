import { model, Schema } from 'mongoose';
import { GENDERS } from '../constants/genders.js';
import { isDateInRange, isValidYYYYMMDD } from '../utils/dateValidation.js';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    email: { type: String, unique: true, required: true, trim: true },

    password: { type: String, required: true, minlength: 8 },

    gender: {
      type: String,
      enum: Object.values(GENDERS),
      default: GENDERS.UNKNOWN,
      required: true,
    },

    dueDate: {
      type: String,
      default: null,
      validate: [
        {
          validator: isValidYYYYMMDD,
          message: 'dueDate must be in YYYY-MM-DD format',
        },
        {
          validator: isDateInRange,
          message:
            'dueDate must be between 1 and 40 weeks from the current date',
        },
      ],
    },

    photo: {
      type: String,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('User', userSchema);

//TODO Check
/* name - max: 32, required,
email - correct email, max: 64, required,
password - min: 8, max: 128, required,
gender - boy, girl, null,
dueDate - string format 'YYYY-MM-DD', min: curDate + 1week, max: curDate + 40weeks */

// const userSchema = new Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: { type: String, unique: true, required: true, trim: true },
//     password: { type: String, required: true, minlength: 8 },
//     gender: {
//       type: String,
//       enum: Object.values(GENDERS) /* ['boy', 'girl', 'unknown'] */,
//       default: GENDERS.UNKNOWN,
//       required: true,
//     },
//     dueDate: { type: String, default: null },
//     photo: {
//       type: String,
//       default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   },
// );
