export interface Task {
    id?: number;
    date: Date;
    title: string;
    description: string;
    start: string;
    end: string;
    completed?: string;
}
