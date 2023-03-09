import { createSlice, current } from '@reduxjs/toolkit';
import { addWeeks, formatISO, parseISO, subWeeks } from 'date-fns';
import { startOfTheWeek } from '../../utils/dateHelpers';

const today = formatISO(new Date());
export const daysOfWeekSlice = createSlice({
    name: 'daysOfWeek',
    initialState: today,
    reducers: {
        lastWeek: (state, action) => {
            const lastWeek = subWeeks(parseISO(action.payload), 1);
            const lastWeekFirstDay = startOfTheWeek(lastWeek);

            return lastWeekFirstDay.toISOString();
        },
        thisWeek: (state, action) => {
            return today;
        },
        nextWeek: (state, action) => {
            const nextWeek = addWeeks(parseISO(action.payload), 1);
            const nextWeekFirstDay = startOfTheWeek(nextWeek);
            return nextWeekFirstDay.toISOString();
        },
        setDay: (state, action) => {
            return action.payload;
        },
    },
});

export const { lastWeek, thisWeek, nextWeek, setDay } = daysOfWeekSlice.actions;
export default daysOfWeekSlice.reducer;
