import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ['boy', 'girl', 'unknown'],
      default: null,
    },
    dueDate: { type: String, default: null },
    photo: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

/* userSchema.pre('save', async function () {
  if (!this.username) {
    this.username = this.email;
  }
}); */

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
