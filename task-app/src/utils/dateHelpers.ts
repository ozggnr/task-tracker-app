import { format, differenceInSeconds, startOfWeek, endOfWeek, isSameSecond, isBefore, isSameDay } from 'date-fns';

//date formats
//created this function since there is a time difference between local and Render
export function convertStringToDate(date: string): Date {
    const formattedDateString = date.split('T')[0];
    const year = Number(formattedDateString.split('-')[0]);
    const month = Number(formattedDateString.split('-')[1]) - 1;
    const day = Number(formattedDateString.split('-')[2]);
    return new Date(year, month, day);
}
export function longDateFormat(date: Date | string) {
    if (typeof date === 'string') date = new Date(date);
    return format(date, 'dd MMMM yyyy');
}
export function shortDateFormat(date: Date | string): string {
    if (typeof date === 'string') date = convertStringToDate(date);
    return format(date, 'MMMM yyyy');
}
export function getMonthText(date: Date | string): string {
    if (typeof date === 'string') date = convertStringToDate(date);
    return format(date, 'LLLL');
}
//date helpers calcs
//return seconds
export function timeDifferenceWithCurrentTime(date: string, time: string) {
    return differenceSeconds(
        { earlierDate: new Date(), earlierTime: format(new Date(), 'HH:mm:ss') },
        { laterDate: convertStringToDate(date), laterTime: time }
    );
}

export function setDateTime(date: Date | string, time: string): Date {
    if (typeof date === 'string') date = convertStringToDate(date);
    const hours = Number(time.split(':')[0]);
    const minutes = Number(time.split(':')[1]);
    return new Date(date.setHours(hours, minutes));
}
export function getLocalizedTime(date: Date): string {
    return format(date, 'p');
}
// earlier: {date: Date, time: string}, later: {date: Date, time: string}
export function differenceSeconds(
    earlier: { earlierDate: Date; earlierTime: string },
    later: { laterDate: Date; laterTime: string }
): number {
    return differenceInSeconds(
        parseDateAndTime(later.laterDate, later.laterTime),
        parseDateAndTime(earlier.earlierDate, earlier.earlierTime)
    );
}

export function getDayOfWeek(date: Date | string) {
    if (typeof date === 'string') date = convertStringToDate(date);
    return format(date, 'eee');
}
export function getDayOfMonth(date: Date | string) {
    if (typeof date === 'string') date = convertStringToDate(date);
    return format(date, 'dd');
}
function parseDateAndTime(date: Date, time: string = '00:00'): Date {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    //or we can use setHours etc...
    const hours = Number(time.split(':')[0]);
    const minutes = Number(time.split(':')[1]);
    const seconds = Number(time.split(':')[2]) || 0;
    return new Date(year, month, day, hours, minutes, seconds);
}

//Start the week from monday
export function startOfTheWeek(date: Date | number) {
    return startOfWeek(date, { weekStartsOn: 1 });
}
export function endOfTheWeek(date: Date | number) {
    return endOfWeek(date, { weekStartsOn: 1 });
}

//comparation
export const isOverdue = (taskDate: Date): boolean => isDayBefore(taskDate, new Date());
export function isDaySame(firstDay: Date, secondDay: Date): boolean {
    return isSameDay(firstDay, secondDay);
}
export function isDayBefore(firstDay: Date, secondDay: Date): boolean {
    return isBefore(parseDateAndTime(firstDay), parseDateAndTime(secondDay));
}
export function isTheSameSecond(firstDate: Date, firstTime: string, secondDate: Date, secondTime: string): boolean {
    return isSameSecond(parseDateAndTime(firstDate, firstTime), parseDateAndTime(secondDate, secondTime));
}
