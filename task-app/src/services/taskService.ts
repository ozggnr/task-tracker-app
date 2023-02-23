import { Task } from '../Types';

type Fetcher = {
    url: string;
    method: string;
    body?: Task;
    json?: boolean;
};
//TODO Use TRY CATCH
const fetcher = async ({ url, method, body, json = true }: Fetcher) => {
    const response = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
};

export async function getTasks() {
    return fetcher({
        url: 'http://localhost:5001/api/task',
        method: 'GET',
    });
}

export async function postTaskService(task: Task) {
    return fetcher({
        url: 'http://localhost:5001/api/task',
        method: 'POST',
        body: task,
    });
}
export async function deleteTaskService(taskId: string) {
    return fetcher({
        url: `http://localhost:5001/api/task/${taskId}`,
        method: 'DELETE',
    });
}

export async function updateTaskService(task: Task) {
    return fetcher({
        url: `http://localhost:5001/api/task/${task.id}`,
        method: 'PUT',
        body: task,
    });
}
export async function deleteSubTaskService(subTaskId: string) {
    return fetcher({
        url: `http://localhost:5001/api/subtask/${subTaskId}`,
        method: 'DELETE',
    });
}
