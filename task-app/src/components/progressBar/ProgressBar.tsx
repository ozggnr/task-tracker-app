import { differenceInSeconds } from 'date-fns';
import { useState, useEffect, useRef } from 'react';
import { differenceSeconds } from '../../utils/dateHelpers';
import { isInProgress } from '../../utils/taskHelpers';
import { ProgressBarContainer, ProgressContainer } from './ProgressBar.style';

type ProgressBarProps = {
    startTime: string;
    endTime: string;
    status?: string;
};

export const ProgressBar = ({ startTime, endTime, status }: ProgressBarProps) => {
    const [now, setNow] = useState(new Date());
    const intervalRef = useRef<number>();
    const totalTime = differenceSeconds(
        { earlierDate: new Date(), earlierTime: startTime! },
        { laterDate: new Date(), laterTime: endTime! }
    );

    const hours = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();
    //difference between now and start time of the task
    const passedTime = differenceSeconds(
        { earlierDate: new Date(), earlierTime: startTime },
        { laterDate: new Date(), laterTime: `${hours}:${mins}:${secs}` }
    );

    useEffect(() => {
        if (`${hours}:${mins}` < endTime) {
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
        height: `${hours}:${mins}` > endTime ? '100%' : `${calcHeight}%`,
    };

    return (
        <ProgressContainer>
            <div>{startTime}</div>
            <ProgressBarContainer status={status}>
                {isInProgress(status!) && <div style={fillerStyles}></div>}
            </ProgressBarContainer>
            <div>{endTime}</div>
        </ProgressContainer>
    );
};
