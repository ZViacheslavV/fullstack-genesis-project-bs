import { Schema, model } from 'mongoose';

const feelingsSchema = new Schema({
  states: {
    type: [String],
    required: true,
  },
  sensationDescr: {
    type: String,
    required: true,
  },
});

const comfortTipSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  tip: {
    type: String,
    required: true,
  },
});

const momStatesSchema = new Schema(
  {
    weekNumber: {
      type: Number,
      required: true,
    },
    feelings: {
      type: feelingsSchema,
      required: true,
    },
    comfortTips: {
      type: [comfortTipSchema],
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const MomStatesCollection = model('Mom', momStatesSchema);
