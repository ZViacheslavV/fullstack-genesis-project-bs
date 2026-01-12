import { model, Schema } from 'mongoose';

const taskSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: 1,
        maxLength: 96,
    }, 
    date: {
        type: String,
        required: true,
        match: /^\d{4}-\d{2}-\d{2}$/
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
}, { timestamps: true, versionKey: false });

export const TasksCollection = model('Task', taskSchema);

