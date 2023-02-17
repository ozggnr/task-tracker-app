import { SubTask, Task } from '../Types';
import { isDayBefore } from './dateHelpers';

type Validation = {
    [key: string]: string[];
};

export const errorMessages = {
    timeOverlap:
        'There are tasks that overlap with the start and end times of this task. Please adjust the times and try again.',
    timeExceed: 'There are subtasks that exceed the start or end times of this task',
    emptyField: "This can't be empty",
    subtaskOverlap: 'There are subtasks that overlap. Please adjust the times and try again.',
};
//overlap tasks
export function checkOverlapTask(existTask: Task, newTask: Task) {
    return (
        (newTask.start >= existTask.start && newTask.start < existTask.end) ||
        (newTask.end > existTask.start && newTask.end < existTask.end)
    );
}
//subTask exceed task
export function hasExceedTimeTask(task: Task) {
    const tasksExceed = task.subTasks.filter(
        (subTask: SubTask) => subTask.start! < task.start! || subTask.end! > task.end!
    );
    return !!tasksExceed.length;
}
export function checkSubtasksOverlap(task: Task) {
    const copiedSubtaskList = [...task.subTasks];
    copiedSubtaskList.sort((a, b) => {
        return a.start! > b.start! ? 1 : -1;
    });

    for (let i = 0; i < copiedSubtaskList.length - 1; i++) {
        const end1 = copiedSubtaskList[i].end as string;
        const start2 = copiedSubtaskList[i + 1].start as string;
        if (end1 > start2) {
            console.log(`Tasks ${i + 1} and ${i + 2} overlap`);
            return true;
        }
    }
}

export function checkEmptyField(value: string) {
    return !value.length;
}

export function mapValidations(fieldNames: string[], message: string, vals: Validation) {
    return fieldNames.reduce((mappedList, name) => {
        if (mappedList[name]) {
            mappedList[name].push(message);
        } else {
            mappedList[name] = [message];
        }
        return mappedList;
    }, vals);
}
