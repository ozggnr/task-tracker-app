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
    weekDays,
} from '../../utils/dateHelpers';
import { DailyTasks } from '../dailytasks/DailyTasks';
import {
    ButtonCaret,
    ButtonToday,
    ButtonDays,
    CalendarContainer,
    CalendarDateContainer,
    CalendarHeader,
} from './Calendar.style';
import { ButtonGroup } from '../button/Button.style';
import { LeftIcon, RightIcon } from '../button/Icon.style';
import { Title } from '../../App.style';

export const Calendar = () => {
    //We will update our state by using dispatch, dispatch gets action with payload
    const dispatch = useDispatch();

    //this is our state
    const activeDay = useSelector((state: RootState) => state.daysOfWeek);
    const calendar: Date[] = getWeeklyCalendar(activeDay);

    const activeMonth = shortDateFormat(activeDay);

    return (
        <CalendarContainer>
            <CalendarHeader>
                <Title>{activeMonth}</Title>
                <ButtonGroup>
                    <ButtonCaret onClick={() => dispatch(lastWeek(activeDay))}>
                        <LeftIcon />
                    </ButtonCaret>
                    <ButtonToday onClick={() => dispatch(thisWeek(activeDay))}>
                        Today
                    </ButtonToday>
                    <ButtonCaret onClick={() => dispatch(nextWeek(activeDay))}>
                        <RightIcon />
                    </ButtonCaret>
                </ButtonGroup>
            </CalendarHeader>
            <CalendarDateContainer>
                {calendar.map((day, i) => {
                    return (
                        <ButtonDays
                            isActive={isSameDay(new Date(activeDay), day)}
                            onClick={() => handleClick(longDateFormat(day))}
                        >
                            {weekDays(day)}{' '}
                            {isSameDay(new Date(activeDay), day)}
                        </ButtonDays>
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
        let endWeek = endOfTheWeek(new Date(day));
        //TODO create helper isBeforeOrSame
        while (isBefore(startWeek, endWeek) || isEqual(startWeek, endWeek)) {
            calendar.push(startWeek);
            startWeek = addDays(startWeek, 1);
        }
        return calendar;
    }
};
