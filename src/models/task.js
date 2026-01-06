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
        type: Date,
        required: true,        
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

export const Task = model('Task', taskSchema);

