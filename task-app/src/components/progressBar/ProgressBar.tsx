import { useState, useEffect, useRef, PropsWithChildren } from 'react';
import {
    convertTimeString,
    durationDifferenceInSeconds,
} from '../../utils/dateHelpers';

export const ProgressBar = () => {
    const [date, setDate] = useState(new Date());
    const intervalRef = useRef();

    const convertedEndTime = convertTimeString(date, '23:00');
    console.log('--', convertedEndTime);

    const totalSecs = durationDifferenceInSeconds(
        new Date(),
        new Date(convertedEndTime)
    );
    const completed = 360 - totalSecs / 360;

    // useEffect(() => {
    //   const timerId = setInterval(refreshClock, 1000);
    //   intervalRef.current = timerId;
    //   return function cleanup() {
    //     clearInterval(intervalRef.current);
    //   };
    // }, []);

    const fillerStyles: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '250px',
        width: '250px',
        borderRadius: '50%',
        border: '2px solid black',
        zIndex: '0',
        background: `conic-gradient(red ${Math.floor(
            completed
        )}deg, #fff 0deg)`,
    };

    if (completed === 360) {
        clearInterval(intervalRef.current);
    }
    return (
        <div className="progressContainer">
            <div style={fillerStyles}>
                {/* <span className="sth">{`${Math.floor(completed)}%`}</span> */}
                <div className="progress-value">
                    {date.toLocaleTimeString()}
                    <img
                        src="images/test.jpg"
                        alt="Task Tag"
                        className="tagImage"
                    />
                </div>
                {completed === 360 && <div>Completed!</div>}
            </div>
        </div>
    );
};
