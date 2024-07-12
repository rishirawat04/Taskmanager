import express from 'express';
import auth from '../middleware/auth';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';

const router = express.Router();

// Task routes requiring authentication
router.post('/tasks', auth, createTask);
router.get('/tasks', auth, getTasks);
router.put('/tasks/:id', auth, updateTask);
router.delete('/tasks/:id', auth, deleteTask);

export default router;
