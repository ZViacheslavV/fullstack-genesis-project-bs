import { Schema, model } from 'mongoose';

const diarySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 64,
    },

    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
    },

    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0], // YYYY-MM-DD
    },

    emotions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Emotion',
        required: true,
      },
    ],

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model('Diary', diarySchema);
