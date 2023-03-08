import { createSlice, PayloadAction, current, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Task } from '../../Types';
import { convertStringToDate, isDaySame } from '../../utils/dateHelpers';
import { isCompleted } from '../../utils/taskHelpers';
import { getTasks } from '../../services/taskService';

interface TaskSliceState {
    tasks: Task[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
}
const initialState: TaskSliceState = {
    tasks: [],
    status: 'idle',
    error: '',
};

export const fetchTasks = createAsyncThunk('/tasks/fethcTasks', getTasks);

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            const newTask = action.payload;
            const tasks = state.tasks;
            state.tasks = [...tasks, newTask];
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
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasks.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const tasks = action.payload;
                state.tasks = [...tasks];
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});
export const selectTaskSlice = (state: RootState) => state.tasks;

//created memoized selector, this will change only when status or error has changed
export const getTasksSelector = createSelector(selectTaskSlice, (taskSlice) => ({
    status: taskSlice.status,
    error: taskSlice.error,
}));

export const getTaskByIdSelector = (id: string) => {
    return createSelector(selectTaskSlice, (tasks) => tasks.tasks.find((task) => task.id === id));
};
export const getDailyTasksSelector = (date: string) => {
    return createSelector(selectTaskSlice, (tasks) => {
        return tasks.tasks.filter((task) => isDaySame(convertStringToDate(task.date), convertStringToDate(date)));
    });
};

export const getWeeklyStatusesSelector = (calendar: Date[]) => {
    //TODO check which one is faster
    return createSelector(selectTaskSlice, (tasks) => {
        const days = new Map<string, boolean | null>();
        calendar.forEach((day) => {
            const sameDayTasks = tasks.tasks.filter((task) => isDaySame(convertStringToDate(task.date), day));
            const isTasksCompleted = sameDayTasks.length
                ? sameDayTasks.every((task) => isCompleted(task.status!))
                : null;
            days.set(day.toISOString(), isTasksCompleted);
        });
        return days;
    });
};

export const { addTask, updateTask, updateTaskStatus, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;

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
