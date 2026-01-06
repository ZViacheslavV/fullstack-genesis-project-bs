import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    gender: {
      type: String,
      enum: ['boy', 'girl', 'unknown'],
      default: 'unknown',
    },
    dueDate: { type: Date, required: true },
    avatar: {
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
