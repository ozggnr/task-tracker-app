import { isDayBefore } from './dateHelpers';

//task status check
export const isCompleted = (status: string): boolean => status?.toUpperCase() === 'COMPLETED';
export const isInProgress = (status: string): boolean => status?.toUpperCase() === 'IN_PROGRESS';
export const isNotCompleted = (status: string): boolean => status?.toUpperCase() === 'NOT_COMPLETED';
export const isNotStarted = (status: string): boolean => status?.toUpperCase() === 'NOT_STARTED';

export function getStatusText(status: string): string {
    let text: string = '';
    switch (status.toUpperCase()) {
        case 'COMPLETED':
            text = 'COMPLETED';
            break;
        case 'IN_PROGRESS':
            text = 'IN PROGRESS';
            break;
        case 'NOT_COMPLETED':
            text = 'NOT COMPLETED';
            break;
        default:
            text = 'NOT STARTED';
    }
    return text;
}
