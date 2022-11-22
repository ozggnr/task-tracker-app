import { createSlice } from '@reduxjs/toolkit';
import { addWeeks, subWeeks } from 'date-fns';
import { longDateFormat, startOfTheWeek } from '../../utils/dateHelpers';

const today = longDateFormat(new Date());
export const daysOfWeekSlice = createSlice({
    name: 'daysOfWeek',
    initialState: today,
    reducers: {
        lastWeek: (state, action) => {
            const lastWeek = subWeeks(new Date(action.payload), 1);
            const lastWeekFirstDay = startOfTheWeek(lastWeek);

            return longDateFormat(lastWeekFirstDay);
        },
        thisWeek: (state, action) => {
            return today;
        },
        nextWeek: (state, action) => {
            const nextWeek = addWeeks(new Date(action.payload), 1);
            const nextWeekFirstDay = startOfTheWeek(nextWeek);

            return longDateFormat(nextWeekFirstDay);
        },
        setDay: (state, action) => {
            return action.payload;
        },
    },
});

export const { lastWeek, thisWeek, nextWeek, setDay } = daysOfWeekSlice.actions;
export default daysOfWeekSlice.reducer;
