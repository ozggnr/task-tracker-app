// import { addDays, format, isBefore, isEqual } from 'date-fns';
// import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { lastWeek, nextWeek, setDay, thisWeek } from '../../store/reducers/daysOfWeekSlice';
// import {
//     endOfTheWeek,
//     getDayOfMonth,
//     getDayOfWeek,
//     isSameDay,
//     longDateFormat,
//     shortDateFormat,
//     startOfTheWeek,
// } from '../../utils/dateHelpers';
// import { DailyTasks } from '../dailytasks/DailyTasks';
// import {
//     CalendarContainer,
//     CalendarContent,
//     CalendarDate,
//     CalendarDateContainer,
//     CalendarHeader,
//     DayMonth,
//     DayWeek,
// } from './Calendar.style';
// import { ButtonCaret, ButtonDays, ButtonGroup, ButtonToday } from '../button/Button.style';
// import { LeftIcon, RightIcon } from '../button/Icon.style';
// import { Title } from '../../App.style';

// export const Calendar = () => {
//     //We will update our state by using dispatch, dispatch gets action with payload
//     const dispatch = useAppDispatch();
//     //this is our state
//     const activeDay = useAppSelector((state) => state.daysOfWeek);
//     const calendar: Date[] = getWeeklyCalendar(activeDay);
//     const activeMonth = shortDateFormat(activeDay);

//     return (
//         <CalendarContainer>
//             <div>
//                 <CalendarHeader>
//                     <Title>{activeMonth}</Title>
//                     <ButtonGroup>
//                         <ButtonCaret onClick={() => dispatch(lastWeek(activeDay))}>
//                             <LeftIcon />
//                         </ButtonCaret>
//                         <ButtonToday onClick={() => dispatch(thisWeek(activeDay))}>Today</ButtonToday>
//                         <ButtonCaret onClick={() => dispatch(nextWeek(activeDay))}>
//                             <RightIcon />
//                         </ButtonCaret>
//                     </ButtonGroup>
//                 </CalendarHeader>
//                 <CalendarContent>
//                     <CalendarDateContainer>
//                         {calendar.map((day, i) => {
//                             return (
//                                 <ButtonDays
//                                     key={i} //TODO change the key
//                                     isActive={isSameDay(new Date(activeDay), day)}
//                                     onClick={() => handleClick(longDateFormat(day))}
//                                 >
//                                     <CalendarDate>
//                                         <DayWeek>{getDayOfWeek(day)}</DayWeek>
//                                         <DayMonth>{getDayOfMonth(day)}</DayMonth>
//                                     </CalendarDate>
//                                 </ButtonDays>
//                             );
//                         })}
//                     </CalendarDateContainer>
//                     <DailyTasks day={activeDay} />
//                 </CalendarContent>
//             </div>
//         </CalendarContainer>
//     );

//     function handleClick(selectedDay: string) {
//         dispatch(setDay(selectedDay));
//     }

//     function getWeeklyCalendar(day: string) {
//         let calendar: Date[] = [];
//         let startWeek = startOfTheWeek(new Date(day));
//         let endWeek = endOfTheWeek(new Date(day));
//         //TODO create helper isBeforeOrSame
//         while (isBefore(startWeek, endWeek) || isEqual(startWeek, endWeek)) {
//             calendar.push(startWeek);
//             startWeek = addDays(startWeek, 1);
//         }
//         return calendar;
//     }
// };
