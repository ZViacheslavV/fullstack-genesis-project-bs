import { Schema, model } from 'mongoose';

const babyStatesSchema = new Schema(
  {
    analogy: {
      type: String,
      required: true,
      default: null,
    },
    weekNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    babySize: {
      type: Number,
      required: true,
      default: 0,
    },
    babyWeight: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    babyActivity: {
      type: String,
      required: true,
    },
    babyDevelopment: {
      type: String,
      required: true,
    },
    interestingFact: {
      type: String,
      required: true,
    },
    momDailyTips: {
      type: [String],
      default: [],
    },
  },
  { timestamps: false },
);

export const BabyStatesCollection = model('Baby', babyStatesSchema);
