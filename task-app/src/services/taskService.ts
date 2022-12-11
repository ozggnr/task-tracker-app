import axios from 'axios';
import { Task } from '../Types';

export async function getTasks() {
    const response = await axios.get('http://localhost:5001/api/task');
    const tasks = response.data.data;
    return tasks;
}

export async function postTask(task: Task) {
    try {
        const posted = await axios.post('http://localhost:5001/api/task', task);
        return posted.data.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteTask(taskId: string) {
    try {
        await axios.delete(`http://localhost:5001/api/task/${taskId}`);
    } catch (error) {
        console.log(error);
    }
}

export async function updateTask(task: Task) {
    try {
        const updated = await axios.put(
            `http://localhost:5001/api/task/${task.id}`,
            task
        );
        return updated.data.data;
    } catch (error) {
        console.log(error);
    }
}
