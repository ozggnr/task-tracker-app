import { Router } from 'express';
import { getTasks, createTask, getTask, updateTask, deleteTask, deleteSubTask } from './handlers/task';

const router = Router();

router.get('/task', getTasks);
router.get('/task/:id', getTask);
router.post('/task', createTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);
router.delete('/subtask/:id', deleteSubTask);

export default router;
