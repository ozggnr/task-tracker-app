import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const today = moment().format('DD MMMM YYYY');
export const daysOfWeekSlice = createSlice({
    name: 'daysOfWeek',
    initialState: today,
    reducers: {
        lastWeek: (state, action) => {
            const lastWeekFirstDay = moment(action.payload)
                .subtract(1, 'week')
                .startOf('week')
                .format('DD MMMM YYYY');
            return lastWeekFirstDay;
        },
        thisWeek: (state, action) => {
            return today;
        },
        nextWeek: (state, action) => {
            const nextWeekFirstDay = moment(action.payload)
                .add(1, 'week')
                .startOf('week')
                .format('DD MMMM YYYY');
            return nextWeekFirstDay;
        },
        setDay: (state, action) => {
            return action.payload;
        },
    },
});

export const { lastWeek, thisWeek, nextWeek, setDay } = daysOfWeekSlice.actions;
export default daysOfWeekSlice.reducer;
