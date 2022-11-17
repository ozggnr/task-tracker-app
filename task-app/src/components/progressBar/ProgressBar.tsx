import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import './styles.css';

export const ProgressBar = () => {
    const [date, setDate] = useState(new Date());
    const intervalRef = useRef();
    const endTime = '23:00';

    function refreshClock() {
        console.log('---------------', intervalRef);
        setDate(new Date());
    }
    function convertStringToTime(date: Date, time: string) {
        const dateString = moment(date).format('L');
        return moment(`${dateString} ${time}`).format('LTS');
    }
    const convertedEndTime = convertStringToTime(date, endTime);
    const nowTime = moment(date).format('LTS');

    const startTime = moment(nowTime, 'HH:mm:ss a');
    const endedTime = moment(convertedEndTime, 'HH:mm:ss a');
    const dif = moment.duration(endedTime.diff(startTime));
    console.log(
        `${dif.hours()} hours, ${dif.minutes()} mins, ${dif.seconds()} secs`
    );

    const totalSecs = dif.hours() * 3600 + dif.minutes() * 60 + dif.seconds();
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
        // background: `conic-gradient(red ${Math.floor(completed)}deg, #fff 0deg)`
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
                </div>
                {completed === 360 && <div>Completed!</div>}
            </div>
        </div>
    );
};
