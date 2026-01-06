import { celebrate } from "celebrate";
import { Router } from "express";
import { createTaskSchema, updateTaskStatusSchema } from "../validations/tasksValidation.js";
import { createTask, getMyTasks, updateTaskStatus } from "../controllers/tasks.js";

const tasksRouter = Router();

// tasksRouter.use('/tasks', authenticate);

tasksRouter.get('/tasks', getMyTasks);
tasksRouter.post('/tasks', celebrate(createTaskSchema), createTask);
tasksRouter.patch('/tasks/:taskId', celebrate(updateTaskStatusSchema), updateTaskStatus);

export default tasksRouter;