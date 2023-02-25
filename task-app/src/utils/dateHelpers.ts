import {
    format,
    intervalToDuration,
    differenceInSeconds,
    isEqual,
    startOfWeek,
    endOfWeek,
    isSameSecond,
    isBefore,
} from 'date-fns';
//TODO refactor this helpers, there are so many functions
//date formats
export function longDateFormat(date: Date | string) {
    if (typeof date === 'string') date = new Date(date);
    return format(date, 'dd MMMM yyyy');
}

export function shortDateFormat(date: Date | string) {
    if (typeof date === 'string') date = new Date(date);
    return format(date, 'MMMM yyyy');
}

//date helpers calcs
//returns time
export function convertTimeString(date: Date, time: string): string {
    const stringDate = format(date, 'dd MMMM yyyy') + ' ' + time;
    return format(new Date(stringDate), "hh:mmaaaaa'm'");
}

export function durationDifferenceInSeconds(startDate: Date, endDate: Date): number {
    return differenceInSeconds(startDate, endDate);
}
// returns { years: ..,  months: .., days: .., hours: ....}
export function durationBetween(startDate: Date, endDate: Date) {
    return intervalToDuration({
        start: startDate,
        end: endDate,
    });
}
//return seconds
export function timeDifferenceWithCurrentTime(date: string, time: string) {
    return differenceSeconds(
        { earlierDate: new Date(), earlierTime: format(new Date(), 'HH:mm:ss') },
        { laterDate: new Date(date), laterTime: time }
    );
}

export function setDateTime(date: Date, time: string): Date {
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
    if (typeof date === 'string') date = new Date(date);
    return format(date, 'eee');
}
export function getDayOfMonth(date: Date | string) {
    if (typeof date === 'string') date = new Date(date);
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
export function isSameDay(firstDay: Date, secondDay: Date): boolean {
    return longDateFormat(firstDay) === longDateFormat(secondDay) ? true : false;
}
export function isDayBefore(firstDay: Date, secondDay: Date): boolean {
    return isBefore(parseDateAndTime(firstDay), parseDateAndTime(secondDay));
}
export function isTheSameSecond(firstDate: Date, firstTime: string, secondDate: Date, secondTime: string): boolean {
    return isSameSecond(parseDateAndTime(firstDate, firstTime), parseDateAndTime(secondDate, secondTime));
}
