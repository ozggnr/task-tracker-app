import { addDays, format, isBefore, isEqual } from 'date-fns';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { lastWeek, nextWeek, setDay, thisWeek } from './store/reducers/daysOfWeekSlice';
import { getWeeklyStatusesSelector } from './store/reducers/tasksSlice';
import {
    convertStringToDate,
    endOfTheWeek,
    getDayOfMonth,
    getDayOfWeek,
    getMonthText,
    isDayBefore,
    isDaySame,
    shortDateFormat,
    startOfTheWeek,
} from './utils/dateHelpers';
import { DailyTasks } from './components/dailytasks/DailyTasks';
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
import { ButtonDays } from './components/button/Button.style';
import { ICON_TYPE } from './components/button/Icon.style';
import Button, { BUTTON_TYPE } from './components/button/Button';

export default function CalendarApp() {
    //We will update our state by using dispatch, dispatch gets action with payload
    const dispatch = useAppDispatch();
    //this is our state
    const activeDay = useAppSelector((state) => state.daysOfWeek); //string
    const calendar: Date[] = getWeeklyCalendar(activeDay); //date
    const activeMonth = shortDateFormat(activeDay);
    const weeklyStatuses = useAppSelector(getWeeklyStatusesSelector(calendar));

    return (
        <Theme>
            <CalendarContainer month={getMonthText(activeDay).toLowerCase()}>
                <CalendarHeader>
                    <Title>{activeMonth}</Title>
                    <CalendarButtonsRow>
                        <Button
                            btnType={BUTTON_TYPE.primary}
                            icon={ICON_TYPE.left}
                            onClick={() => dispatch(lastWeek(activeDay))}
                        />
                        <Button btnType={BUTTON_TYPE.primary} onClick={() => dispatch(thisWeek(activeDay))}>
                            Today
                        </Button>
                        <Button
                            btnType={BUTTON_TYPE.primary}
                            icon={ICON_TYPE.right}
                            onClick={() => dispatch(nextWeek(activeDay))}
                        />
                    </CalendarButtonsRow>
                </CalendarHeader>
                <CalendarContent>
                    <CalendarDateContainer>
                        {calendar.map((day, i) => {
                            return (
                                <ButtonDays
                                    key={i} //TODO change the key
                                    isActive={isDaySame(convertStringToDate(activeDay), day)}
                                    isDayBefore={isDayBefore(day, new Date())}
                                    onClick={() => handleDaySelect(day)}
                                    taskCompleted={checkTasksCompleted(day)}
                                    aria-describedby={getTooltipText(day)}
                                >
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

    function getTooltipText(day: Date) {
        let text: string;
        if (checkTasksCompleted(day) === null) return 'No task assigned';
        else {
            checkTasksCompleted(day) ? (text = 'Task(s) are completed!') : (text = 'You have incompleted Task(s)');
            return text;
        }
    }

    function handleDaySelect(selectedDay: Date) {
        const selectedDayString = selectedDay.toISOString();
        dispatch(setDay(selectedDayString));
    }

    function getWeeklyCalendar(day: string): Date[] {
        let calendar: Date[] = [];
        const formatedDate = convertStringToDate(day);
        let startWeek = startOfTheWeek(formatedDate);
        let endWeek = endOfTheWeek(formatedDate);
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
