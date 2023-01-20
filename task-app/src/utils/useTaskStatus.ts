import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { updateTaskStatus } from '../store/reducers/tasksSlice';
import { SubTask, Task } from '../Types';
import { getDateTime, timeDifferenceWithRealTime } from './dateHelpers';

export function useTaskStatus(activeTask: Task): Task {
    const dispatch = useAppDispatch();
    useEffect(() => {
        let timerId: number;
        const getRemainingSecsStart = timeDifferenceWithRealTime(activeTask.date, activeTask.start);
        const getRemainingSecsEnd = timeDifferenceWithRealTime(activeTask.date, activeTask.end);
        const taskStart = getDateTime(new Date(activeTask.date), activeTask.start);
        const taskEnd = getDateTime(new Date(activeTask.date), activeTask.end);
        const currentTime = new Date();

        console.log('render');
        if (activeTask.status !== 'COMPLETED') {
            if (currentTime >= taskStart && currentTime < taskEnd) {
                dispatch(updateTaskStatus({ id: activeTask.id, status: 'IN_PROGRESS' }));
                timerId = schedule(getRemainingSecsEnd, 'NOT_COMPLETED', activeTask?.id!);
            } else if (currentTime < taskStart) {
                dispatch(updateTaskStatus({ id: activeTask.id, status: 'NOT_STARTED' }));
                timerId = schedule(getRemainingSecsStart, 'IN_PROGRESS', activeTask?.id!);
            } else {
                dispatch(updateTaskStatus({ id: activeTask.id, status: 'NOT_COMPLETED' }));
            }
        }
        return () => clearTimeout(timerId);
    }, [activeTask.status, activeTask.start, activeTask.end]);

    function schedule(timeToSet: number, taskStatus: string, id: string) {
        console.log(timeToSet, taskStatus, id);
        const timerId = setTimeout(() => {
            dispatch(updateTaskStatus({ id: id, status: taskStatus }));
        }, timeToSet * 1000);
        return timerId;
    }
    console.log(activeTask);
    return activeTask;
}
