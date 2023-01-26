import { createSlice, PayloadAction, current, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Task } from '../../Types';
import { longDateFormat } from '../../utils/dateHelpers';

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
    return createSelector(
        (state: RootState) => state.tasks.tasks,
        (tasks) => tasks.find((task) => task.id === id)
    );
};
export const getDailyTasksSelector = (date: string) => {
    return createSelector(
        (state: RootState) => state.tasks.tasks,
        (tasks) => tasks.filter((task) => longDateFormat(task.date) === date)
    );
};
export default tasksSlice.reducer;
