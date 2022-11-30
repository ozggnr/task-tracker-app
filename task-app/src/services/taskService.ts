import axios from 'axios';
import { Task } from '../Types';

export async function getTasks() {
    const response = await axios.get('http://localhost:5001/api/task');
    const tasks = response.data.data;
    return tasks;
}

export async function postTask(task: Task) {
    await axios.post('http://localhost:5001/api/task', task);
}
