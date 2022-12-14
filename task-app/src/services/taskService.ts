import { Task } from '../Types';

type Fetcher = {
    url: string;
    method: string;
    body?: Task;
    json?: boolean;
};
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
        throw new Error('API error!');
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

export async function postTask(task: Task) {
    return fetcher({
        url: 'http://localhost:5001/api/task',
        method: 'POST',
        body: task,
    });
}
export async function deleteTask(taskId: string) {
    return fetcher({
        url: `http://localhost:5001/api/task/${taskId}`,
        method: 'DELETE',
    });
}

export async function updateTask(task: Task) {
    return fetcher({
        url: `http://localhost:5001/api/task/${task.id}`,
        method: 'PUT',
        body: task,
    });
}
