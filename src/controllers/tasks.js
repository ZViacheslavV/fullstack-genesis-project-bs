import createHttpError from 'http-errors';
import { TasksCollection } from '../models/task.js';

export const getMyTasks = async (req, res) => {
    const tasks = await TasksCollection.find({ userId: req.user._id });
    res.status(200).json(tasks);
};

export const createTask = async (req, res) => {
  const task = await TasksCollection.create({
    ...req.body,
    userId: req.user._id,
  });  
  res.status(201).json(task);
};

export const updateTaskStatus = async (req, res, next) => {
    const { taskId } = req.params;
    const { isDone } = req.body;
    const task = await TasksCollection.findOneAndUpdate(
      { _id: taskId, userId: req.user._id }, 
      { isDone }, 
      { new: true }
    );
  if (!task) {
    return next(createHttpError(404, 'Task not found'));
    
  }
  res.status(200).json(task);
};
