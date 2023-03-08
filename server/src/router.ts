import { Router } from 'express';
import { getTasks, createTask, getTask, updateTask, deleteTask, deleteSubTask } from './handlers/task';

const router = Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.delete('/subtasks/:id', deleteSubTask);

export default router;
