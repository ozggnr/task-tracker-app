import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './reducers/tasksSlice';
import daysOfWeekReducer from './reducers/daysOfWeekSlice';

//This will automatically create the root reducer by passing this object to the Redux combineReducer
export const store = configureStore({
    reducer: {
        daysOfWeek: daysOfWeekReducer,
        tasks: tasksReducer,
    },
});
//Define the state type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
