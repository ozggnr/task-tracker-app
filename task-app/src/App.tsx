import { addDays, format, isBefore, isEqual } from 'date-fns';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { lastWeek, nextWeek, setDay, thisWeek } from './store/reducers/daysOfWeekSlice';
import { getWeeklyStatusesSelector } from './store/reducers/tasksSlice';
import {
    endOfTheWeek,
    getDayOfMonth,
    getDayOfWeek,
    isSameDay,
    longDateFormat,
    shortDateFormat,
    startOfTheWeek,
} from './utils/dateHelpers';
import { DailyTasks } from './components/dailytasks/DailyTasks';
import { Message, SEVERITY_TYPE } from './components/message/Message';
import {
    CalendarContainer,
    CalendarContent,
    CalendarDate,
    CalendarDateContainer,
    CalendarHeader,
    DayMonth,
    DayWeek,
    Title,
} from './CalendarApp.style';
import { ButtonCaret, ButtonDays, ButtonGroup, ButtonToday } from './components/button/Button.style';
import { LeftIcon, RightIcon } from './components/button/Icon.style';

export default function CalendarApp() {
    //We will update our state by using dispatch, dispatch gets action with payload
    const dispatch = useAppDispatch();
    //this is our state
    const activeDay = useAppSelector((state) => state.daysOfWeek);
    const calendar: Date[] = getWeeklyCalendar(activeDay);
    const activeMonth = shortDateFormat(activeDay);
    const weeklyStatuses = useAppSelector(getWeeklyStatusesSelector(calendar));

    return (
        <CalendarContainer>
            <CalendarHeader>
                <Title>{activeMonth}</Title>
                <ButtonGroup>
                    <ButtonCaret onClick={() => dispatch(lastWeek(activeDay))}>
                        <LeftIcon />
                    </ButtonCaret>
                    <ButtonToday onClick={() => dispatch(thisWeek(activeDay))}>Today</ButtonToday>
                    <ButtonCaret onClick={() => dispatch(nextWeek(activeDay))}>
                        <RightIcon />
                    </ButtonCaret>
                </ButtonGroup>
            </CalendarHeader>
            <CalendarContent>
                <CalendarDateContainer>
                    {calendar.map((day, i) => {
                        return (
                            <ButtonDays
                                key={i} //TODO change the key
                                isActive={isSameDay(new Date(activeDay), day)}
                                onClick={() => handleClick(longDateFormat(day))}
                                taskCompleted={weeklyStatuses.get(day.toISOString())}
                            >
                                <Message
                                    message="You have incompleted Task(s)"
                                    severity={SEVERITY_TYPE.warning}
                                ></Message>

                                <CalendarDate>
                                    <DayWeek>{getDayOfWeek(day)}</DayWeek>
                                    <DayMonth>{getDayOfMonth(day)}</DayMonth>
                                </CalendarDate>
                            </ButtonDays>
                        );
                    })}
                </CalendarDateContainer>
                <DailyTasks day={activeDay} />
            </CalendarContent>
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
}
