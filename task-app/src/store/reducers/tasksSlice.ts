import { createSlice, PayloadAction, current, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Task } from '../../Types';
import { longDateFormat } from '../../utils/dateHelpers';
import { isCompleted } from '../../utils/validationHelpers';

interface TaskSliceState {
    tasks: Task[];
}
const initialState: TaskSliceState = {
    tasks: [],
};
export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const task = action.payload;
            const updatedTasks = state.tasks.map((prevTask) => (prevTask.id === task.id ? task : prevTask));
            state.tasks = updatedTasks;
        },
        deleteTask: (state, action: PayloadAction<Task>) => {
            const filteredTasks = state.tasks.filter((prevTask) => prevTask.id !== action.payload.id);
            state.tasks = filteredTasks;
        },
        updateTaskStatus: (state, action) => {
            const { id, status } = action.payload;
            const taskIndex = state.tasks.findIndex((prevTask) => prevTask.id === id);
            state.tasks[taskIndex].status = status;
        },
        setTasks: (state, action: PayloadAction<Task[]>) => {
            const tasks = action.payload;
            state.tasks = [...tasks];
        },
    },
});

export const { addTask, updateTask, updateTaskStatus, deleteTask, setTasks } = tasksSlice.actions;
export const tasksSelector = (state: RootState) => {
    return state.tasks.tasks;
};
// export const getTaskSelector = (state: RootState, taskId: string) => {
//     console.log('here3');
//     return state.tasks.tasks.find((task) => task.id === taskId);
// };
export const getTaskSelector = (id: string) => {
    console.log('slice1');
    return createSelector(
        (state: RootState) => state.tasks.tasks,
        (tasks) => tasks.find((task) => task.id === id)
    );
};
export const getDailyTasksSelector = (date: string) => {
    console.log('slice2');
    return createSelector(
        (state: RootState) => state.tasks.tasks,
        (tasks) => tasks.filter((task) => longDateFormat(task.date) === date)
    );
};
type GroupType = {
    // [key: string]: Task[];
    [key: string]: boolean | null;
};
export const getWeeklyStatusesSelector = (calendar: Date[]) => {
    //TODO check which one is faster
    return createSelector(
        (state: RootState) => state.tasks.tasks,
        (tasks) => {
            const days = new Map<string, boolean | null>();
            calendar.forEach((day) => {
                const sameDayTasks = tasks.filter((task) => task.date === day.toISOString());
                const isTasksCompleted = sameDayTasks.length
                    ? sameDayTasks.every((task) => isCompleted(task.status!))
                    : null;
                days.set(day.toISOString(), isTasksCompleted);
            });
            return days;
        }
    );
    // return createSelector(
    //     (state: RootState) => state.tasks.tasks,
    //     (tasks) =>
    //         calendar.reduce((days, day) => {
    //             const sameDayTasks = tasks.filter((task) => task.date === day.toISOString());
    //             const isTasksCompleted = sameDayTasks.length
    //                 ? sameDayTasks.every((task) => isCompleted(task.status!))
    //                 : 'No Task';
    //             days[day.toISOString()] = isTasksCompleted;
    //             return days;
    //         }, {} as GroupType)
    // );
};

export default tasksSlice.reducer;
