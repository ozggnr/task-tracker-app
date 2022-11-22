import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
    lastWeek,
    nextWeek,
    setDay,
    thisWeek,
} from '../../store/reducers/daysOfWeekSlice';
import { DailyTasks } from '../DailyTasks';
import { TaskForm } from '../TaskForm';
import { CalendarContainer, CalendarDateContainer } from './Calendar.style';

export const Calendar = () => {
    const [openForm, setOpenForm] = useState(false);

    //We will update our state by using dispatch, dispatch gets action with payload
    const dispatch = useDispatch();

    //this is our state
    const activeDay = useSelector((state: RootState) => state.daysOfWeek);
    const calendar: moment.Moment[] = getWeeklyCalendar(activeDay);

    const activeMonth = moment(activeDay).format('MMMM YYYY');

    // Moment(new Date(date)).format('MM/DD/YYYY') --> to get rid of the moment deprecated warning
    //key is not good :(
    return (
        <CalendarContainer>
            <div className="dates-top">
                <div>{activeMonth}</div>
                <div>
                    <button onClick={() => setOpenForm(true)}>
                        Create New Task
                    </button>
                </div>
                <div className="button-group-week">
                    <button onClick={() => dispatch(lastWeek(activeDay))}>
                        {'<'}
                    </button>
                    <button onClick={() => dispatch(thisWeek(activeDay))}>
                        Today
                    </button>
                    <button onClick={() => dispatch(nextWeek(activeDay))}>
                        {'>'}
                    </button>
                </div>
            </div>
            {openForm && <TaskForm />}
            <CalendarDateContainer>
                {calendar.map((day, i) => {
                    const selectedDay = moment(
                        moment(activeDay).format('DD MMMM YYYY')
                    ).isSame(moment(day).format('DD MMMM YYYY'));
                    return (
                        <div
                            key={i}
                            className={'date' + (selectedDay ? ' active' : '')}
                            onClick={() =>
                                handleClick(day.format('DD MMMM YYYY'))
                            }
                        >
                            {day.format('ddd D')}
                        </div>
                    );
                })}
            </CalendarDateContainer>
            <DailyTasks day={activeDay} />
        </CalendarContainer>
    );

    function handleClick(selectedDay: string) {
        dispatch(setDay(selectedDay));
    }

    function getWeeklyCalendar(day: string) {
        let calendar: moment.Moment[] = [];
        let startWeek = moment(day).startOf('week');
        let endWeek = moment(day).endOf('week');
        let start = startWeek.day();
        while (start <= endWeek.day()) {
            calendar.push(startWeek.clone());
            startWeek.add(1, 'day');
            start++;
        }
        return calendar;
    }
};
