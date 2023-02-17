import { isDayBefore } from './dateHelpers';

export const isCompleted = (status: string): boolean => status?.toUpperCase() === 'COMPLETED';
export const isInProgress = (status: string): boolean => status?.toUpperCase() === 'IN_PROGRESS';
export const isNotCompleted = (status: string): boolean => status?.toUpperCase() === 'NOT_COMPLETED';
export const isNotStarted = (status: string): boolean => status?.toUpperCase() === 'NOT_STARTED';
export const isOverdue = (taskDate: Date): boolean => isDayBefore(taskDate, new Date());
