import { Schema, model } from 'mongoose';

const emotionSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      minlength: 1,
      maxlength: 64,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export default model('Emotion', emotionSchema);
