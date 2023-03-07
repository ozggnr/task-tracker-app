export interface Task {
    id?: string;
    date: string;
    title: string;
    description: string;
    start: string;
    end: string;
    status?: string;
    subTasks: SubTask[];
}

export interface SubTask {
    id?: string;
    date: string;
    description: string;
    start: string;
    end: string;
    status?: string;
}
