import { configureStore } from '@reduxjs/toolkit';
import daysOfWeekReducer from './reducers/daysOfWeekSlice';

//This will automatically create the root reducer by passing this object to the Redux combineReducer
const store = configureStore({
    reducer: {
        daysOfWeek: daysOfWeekReducer,
    },
});
//Define the state type
export type RootState = ReturnType<typeof store.getState>;
export default store;
