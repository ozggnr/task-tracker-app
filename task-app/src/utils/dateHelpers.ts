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

export function weekDays(date: Date | string) {
    if (typeof date === 'string') date = new Date(date);
    return format(date, 'eee dd');
}
export function isSameDay(firstDay: Date, secondDay: Date): boolean {
    return longDateFormat(firstDay) === longDateFormat(secondDay)
        ? true
        : false;
}
//Start the week from monday
export function startOfTheWeek(date: Date | number) {
    return startOfWeek(date, { weekStartsOn: 1 });
}
export function endOfTheWeek(date: Date | number) {
    return endOfWeek(date, { weekStartsOn: 1 });
}
