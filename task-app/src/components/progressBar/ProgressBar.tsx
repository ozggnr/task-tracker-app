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
    const [date, setDate] = useState(new Date());
    const intervalRef = useRef<number>();
    const timedifference = differenceSeconds(
        { earlierDate: new Date(), earlierTime: startTime! },
        { laterDate: new Date(), laterTime: endTime! }
    );
    //TODO refactor this code
    const hours = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();
    const starthours = Number(startTime.split(':')[0]);
    const startMins = Number(startTime.split(':')[1]);
    const result = differenceInSeconds(
        new Date(2022, 2, 10, hours, mins, secs),
        new Date(2022, 2, 10, starthours, startMins, 0)
    );
    // useEffect(() => {
    //     if (`${hours}:${mins}` < endTime) {
    //         console.log('in');
    //         const timerId = setInterval(() => setDate(new Date()), 1000);
    //         intervalRef.current = timerId;
    //     }
    //     return function cleanup() {
    //         clearInterval(intervalRef.current);
    //     };
    // }, []);

    let calcHeight = Math.floor((result * 100) / timedifference);

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

// import { useState, useEffect, useRef, PropsWithChildren } from 'react';
// import { durationBetween } from '../../utils/dateHelpers';

// type ProgressBarProps = {
//     startTime: string;
//     endTime: string;
// };
// export const ProgressBar = ({ startTime, endTime }: ProgressBarProps) => {
//     const [date, setDate] = useState(new Date());
//     const intervalRef = useRef<number>();

//     // console.log('--', new Date(convertedEndTime));
//     // console.log('total', totalSecs);
//     const completed = 360;
//     // console.log(completed);
//     // useEffect(() => {
//     //     const timerId = setInterval(() => setDate(new Date()), 1000);
//     //     intervalRef.current = timerId;
//     //     return function cleanup() {
//     //         clearInterval(intervalRef.current);
//     //     };
//     // }, []);

//     const fillerStyles: React.CSSProperties = {
//         position: 'relative',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100px',
//         width: '100px',
//         borderRadius: '50%',
//         border: '2px solid black',
//         zIndex: '0',
//         background: `conic-gradient(red ${Math.floor(completed)}deg, #fff 0deg)`,
//     };

//     // if (completed === 360) {
//     //     clearInterval(intervalRef.current);
//     // }

//     return (
//         <div className="progressContainer">
//             <div style={fillerStyles}>
//                 {/* <span className="sth">{`${Math.floor(completed)}%`}</span> */}
//                 <div className="progress-value">
//                     {date.toLocaleTimeString()}
//                     {/* <img src="images/test.jpg" alt="Task Tag" className="tagImage" /> */}
//                 </div>
//             </div>
//         </div>
//     );
// };
