export interface Task {
    id?: number,
    date: string,
    title: string,
    desc: string,
    start: string,
    end: string,
    completed: boolean,
    repeat: string
}