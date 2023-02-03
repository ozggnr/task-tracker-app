import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { updateTaskStatus } from '../store/reducers/tasksSlice';
import { Task } from '../Types';
import { getDateTime, timeDifferenceWithCurrentTime } from './dateHelpers';

export function useTaskStatus(activeTask: Task): Task {
    const dispatch = useAppDispatch();
    useEffect(() => {
        let timerId: number;
        const getRemainingSecsStart = timeDifferenceWithCurrentTime(activeTask.date, activeTask.start);
        const getRemainingSecsEnd = timeDifferenceWithCurrentTime(activeTask.date, activeTask.end);
        const taskStart = getDateTime(new Date(activeTask.date), activeTask.start);
        const taskEnd = getDateTime(new Date(activeTask.date), activeTask.end);
        const currentTime = new Date();

        if (activeTask.status?.toUpperCase() !== 'COMPLETED') {
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
        const timerId = setTimeout(() => {
            dispatch(updateTaskStatus({ id: id, status: taskStatus }));
        }, timeToSet * 1000);
        return timerId;
    }

    return activeTask;
}
