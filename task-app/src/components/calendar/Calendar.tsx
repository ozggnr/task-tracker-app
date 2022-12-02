import { addDays, isBefore, isEqual } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
    lastWeek,
    nextWeek,
    setDay,
    thisWeek,
} from '../../store/reducers/daysOfWeekSlice';
import {
    endOfTheWeek,
    isSameDay,
    longDateFormat,
    shortDateFormat,
    startOfTheWeek,
    weekDay,
} from '../../utils/dateHelpers';
import { DailyTasks } from '../dailytasks/DailyTasks';
import {
    ButtonCaret,
    ButtonToday,
    CalendarContainer,
    CalendarDateContainer,
} from './Calendar.style';
import { Row } from '../../App.style';
import Button from '../button/Button';
import { LeftIcon, RightIcon } from '../button/Icon.style';

export const Calendar = () => {
    //We will update our state by using dispatch, dispatch gets action with payload
    const dispatch = useDispatch();

    //this is our state
    const activeDay = useSelector((state: RootState) => state.daysOfWeek);
    const calendar: Date[] = getWeeklyCalendar(activeDay);

    const activeMonth = shortDateFormat(activeDay);
    console.log(activeMonth);
    return (
        <CalendarContainer>
            <div className="dates-top">
                <div>{activeMonth}</div>
                <Row>
                    <ButtonCaret onClick={() => dispatch(lastWeek(activeDay))}>
                        <LeftIcon />
                    </ButtonCaret>
                    <ButtonToday onClick={() => dispatch(thisWeek(activeDay))}>
                        Today
                    </ButtonToday>
                    <ButtonCaret onClick={() => dispatch(nextWeek(activeDay))}>
                        <RightIcon />
                    </ButtonCaret>
                </Row>
            </div>
            <CalendarDateContainer>
                {calendar.map((day, i) => {
                    return (
                        <div
                            key={i}
                            className={
                                'date' +
                                (isSameDay(new Date(activeDay), day)
                                    ? ' active'
                                    : '')
                            }
                            onClick={() => handleClick(longDateFormat(day))}
                        >
                            {weekDay(day)}
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
        let calendar: Date[] = [];
        let startWeek = startOfTheWeek(new Date(day));
        console.log(startWeek);
        let endWeek = endOfTheWeek(new Date(day));
        //TODO create helper isBeforeOrSame
        while (isBefore(startWeek, endWeek) || isEqual(startWeek, endWeek)) {
            calendar.push(startWeek);
            startWeek = addDays(startWeek, 1);
        }
        return calendar;
    }
};
