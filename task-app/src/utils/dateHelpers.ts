import {
    format,
    intervalToDuration,
    differenceInSeconds,
    isEqual,
    startOfWeek,
    endOfWeek,
    isSameSecond,
} from 'date-fns';

//date formats
export function longDateFormat(date: Date | string) {
    if (typeof date === 'string') date = new Date(date);
    return format(date, 'dd MMMM yyyy');
}

export function shortDateFormat(date: Date | string) {
    if (typeof date === 'string') date = new Date(date);
    return format(date, 'MMMM yyyy');
}

//date helpers
export function convertTimeString(date: Date, time: string): string {
    const stringDate = format(date, 'dd MMMM yyyy') + ' ' + time;
    return format(new Date(stringDate), "hh:mmaaaaa'm'");
}

export function durationDifferenceInSeconds(
    startDate: Date,
    endDate: Date
): number {
    return differenceInSeconds(startDate, endDate);
}

export function durationBetween(startDate: Date, endDate: Date) {
    return intervalToDuration({
        start: startDate,
        end: endDate,
    });
}

export function timeDifferenceWithRealTime(date: string, time: string) {
    return differenceSeconds(
        new Date(date),
        time,
        new Date(),
        format(new Date(), 'HH:mm:ss')
    );
}

export function getDateTime(date: Date, time: string): Date {
    const hours = Number(time.split(':')[0]);
    const minutes = Number(time.split(':')[1]);
    return new Date(date.setHours(hours, minutes));
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
export function isTheSameSecond(
    firstDate: Date,
    firstTime: string,
    secondDate: Date,
    secondTime: string
): boolean {
    return isSameSecond(
        parseDateAndTime(firstDate, firstTime),
        parseDateAndTime(secondDate, secondTime)
    );
}
export function differenceSeconds(
    firstDate: Date,
    firstTime: string,
    secondDate: Date,
    secondTime: string
): number {
    return differenceInSeconds(
        parseDateAndTime(firstDate, firstTime),
        parseDateAndTime(secondDate, secondTime)
    );
}

function parseDateAndTime(date: Date, time: string): Date {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    //or we can use setHours etc...
    const hours = Number(time.split(':')[0]);
    const minutes = Number(time.split(':')[1]);
    const seconds = Number(time.split(':')[2]) || 0;
    // console.log(hours, minutes, seconds);
    return new Date(year, month, day, hours, minutes, seconds);
}

//Start the week from monday
export function startOfTheWeek(date: Date | number) {
    return startOfWeek(date, { weekStartsOn: 1 });
}
export function endOfTheWeek(date: Date | number) {
    return endOfWeek(date, { weekStartsOn: 1 });
}
