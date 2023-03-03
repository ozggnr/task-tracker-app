import { useState, useEffect, useRef } from 'react';
import { differenceSeconds, getLocalizedTime, setDateTime } from '../../utils/dateHelpers';
import { isInProgress } from '../../utils/taskHelpers';
import { ProgressBarContainer, ProgressContainer, ProgressTime } from './ProgressBar.style';

type ProgressBarProps = {
    startTime: string;
    endTime: string;
    status?: string;
    date: string;
};

export const ProgressBar = ({ startTime, endTime, status, date }: ProgressBarProps) => {
    const [now, setNow] = useState(new Date());
    const intervalRef = useRef<number>();
    const totalTime = differenceSeconds(
        { earlierDate: new Date(date), earlierTime: startTime! },
        { laterDate: new Date(date), laterTime: endTime! }
    );

    const hours = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();
    //difference between now and start time of the task
    const passedTime = differenceSeconds(
        { earlierDate: new Date(date), earlierTime: startTime },
        { laterDate: new Date(), laterTime: `${hours}:${mins}:${secs}` }
    );
    //eif end time is bigger then this should be bigger than zero
    const remainingTime = differenceSeconds(
        { earlierDate: new Date(), earlierTime: `${hours}:${mins}:${secs}` },
        { laterDate: new Date(date), laterTime: endTime }
    );

    useEffect(() => {
        if (remainingTime > 0) {
            const timerId = setInterval(() => setNow(new Date()), 1000);
            intervalRef.current = timerId;
        }
        return function cleanup() {
            clearInterval(intervalRef.current);
        };
    }, []);
    //passed time converted into height
    let calcHeight = Math.floor((passedTime * 100) / totalTime);
    //end timer
    if (calcHeight === 100) {
        clearInterval(intervalRef.current);
    }

    const fillerStyles = {
        backgroundColor: '#8707ff',
        borderRadius: '0.5rem',
        height: remainingTime < 0 ? '100%' : `${calcHeight}%`,
    };
    const getStartLocalizedTime = getLocalizedTime(setDateTime(new Date(), startTime));
    const getEndLocalizedTime = getLocalizedTime(setDateTime(new Date(), endTime));

    return (
        <ProgressContainer>
            <ProgressTime>{getStartLocalizedTime}</ProgressTime>
            <ProgressBarContainer status={status}>
                {isInProgress(status!) && <div style={fillerStyles}></div>}
            </ProgressBarContainer>
            <ProgressTime>{getEndLocalizedTime}</ProgressTime>
        </ProgressContainer>
    );
};
