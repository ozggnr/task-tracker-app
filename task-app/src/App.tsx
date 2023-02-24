import { addDays, format, isBefore, isEqual } from 'date-fns';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { lastWeek, nextWeek, setDay, thisWeek } from './store/reducers/daysOfWeekSlice';
import { getWeeklyStatusesSelector } from './store/reducers/tasksSlice';
import {
    endOfTheWeek,
    getDayOfMonth,
    getDayOfWeek,
    isDayBefore,
    isSameDay,
    longDateFormat,
    shortDateFormat,
    startOfTheWeek,
} from './utils/dateHelpers';
import { DailyTasks } from './components/dailytasks/DailyTasks';
import { Message, SEVERITY_TYPE } from './components/message/Message';
import Theme from './Theme';
import {
    CalendarButtonsRow,
    CalendarContainer,
    CalendarContent,
    CalendarDate,
    CalendarDateContainer,
    CalendarHeader,
    DayMonth,
    DayWeek,
    Title,
} from './App.style';
import { ButtonCaret, ButtonDays, ButtonToday } from './components/button/Button.style';
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
        <Theme>
            <CalendarContainer>
                <CalendarHeader>
                    <Title>{activeMonth}</Title>
                    <CalendarButtonsRow>
                        <ButtonCaret onClick={() => dispatch(lastWeek(activeDay))}>
                            <LeftIcon />
                        </ButtonCaret>
                        <ButtonToday onClick={() => dispatch(thisWeek(activeDay))}>Today</ButtonToday>
                        <ButtonCaret onClick={() => dispatch(nextWeek(activeDay))}>
                            <RightIcon />
                        </ButtonCaret>
                    </CalendarButtonsRow>
                </CalendarHeader>
                <CalendarContent>
                    <CalendarDateContainer>
                        {calendar.map((day, i) => {
                            return (
                                <ButtonDays
                                    key={i} //TODO change the key
                                    isActive={isSameDay(new Date(activeDay), day)}
                                    isDayBefore={isDayBefore(day, new Date())}
                                    onClick={() => handleDaySelect(longDateFormat(day))}
                                    taskCompleted={checkTasksCompleted(day)}
                                >
                                    {checkTasksCompleted(day) !== null &&
                                        (checkTasksCompleted(day) ? (
                                            <Message
                                                message="Task(s) are completed!"
                                                severity={SEVERITY_TYPE.success}
                                            />
                                        ) : (
                                            <Message
                                                message="You have incompleted Task(s)"
                                                severity={SEVERITY_TYPE.warning}
                                            />
                                        ))}

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
        </Theme>
    );

    function handleDaySelect(selectedDay: string) {
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

    function checkTasksCompleted(day: Date) {
        return weeklyStatuses.get(day.toISOString());
    }
}
