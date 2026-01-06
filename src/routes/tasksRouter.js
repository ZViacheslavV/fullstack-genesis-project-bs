import { celebrate } from "celebrate";
import { Router } from "express";
import { createTaskSchema, updateTaskStatusSchema } from "../validations/tasksValidation.js";
import { createTask, getMyTasks, updateTaskStatus } from "../controllers/tasksController.js";

const router = Router();

// router.use('/tasks', authenticate);

router.get('/tasks', getMyTasks);
router.post('/tasks', celebrate(createTaskSchema), createTask);
router.patch('/tasks', celebrate(updateTaskStatusSchema), updateTaskStatus);

export default router;