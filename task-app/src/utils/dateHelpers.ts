import {
    format,
    intervalToDuration,
    differenceInSeconds,
    isEqual,
    startOfWeek,
    endOfWeek,
} from 'date-fns';

//date helpers
export function convertTimeString(date: string | Date, time: string): string {
    return format(new Date(date), "hh:mmaaaaa'm'");
}

export function stringDate(date: Date, time: string): string {
    return format(date, 'dd MMMM yyyy') + ' ' + time;
}

export function durationDifferenceInSeconds(
    startDate: Date,
    endDate: Date
): number {
    return differenceInSeconds(startDate, endDate);
}

export function longDateFormat(date: Date | string) {
    if (typeof date === 'string') date = new Date(date);
    return format(date, 'dd MMMM yyyy');
}

export function shortDateFormat(date: Date | string) {
    if (typeof date === 'string') date = new Date(date);
    return format(date, 'MMMM yyyy');
}

export function weekDay(date: Date | string) {
    if (typeof date === 'string') date = new Date(date);
    return format(date, 'dd eee');
}
export function isSameDay(firstDay: Date, secondDay: Date): boolean {
    return longDateFormat(firstDay) === longDateFormat(secondDay)
        ? true
        : false;
}
export function startOfTheWeek(date: Date | number) {
    return startOfWeek(date);
}
export function endOfTheWeek(date: Date | number) {
    return endOfWeek(date);
}
