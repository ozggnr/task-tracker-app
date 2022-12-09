export interface Task {
    id?: string;
    date: Date;
    title: string;
    description: string;
    start: string;
    end: string;
    completed?: string;
    subTasks: SubTask[];
}

export interface SubTask {
    id?: string;
    description?: string;
    start?: string;
    end?: string;
    completed?: string;
}
