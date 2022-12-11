import { Router } from 'express';
import {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
} from './handlers/task';

const router = Router();

router.get('/task', getTasks);
router.get('/task/:id', getTask);
router.post('/task', createTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

export default router;
