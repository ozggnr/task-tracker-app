import { useState, useEffect, useRef } from "react";
import moment from "moment";

export const ProgressBar = () => {
    const [date, setDate] = useState(new Date());
    const intervalRef = useRef<number>();
    const endTime = "16:46";

    useEffect(() => {
        const timerId = setInterval(() => setDate(new Date()), 1000);
        intervalRef.current = timerId;
        return function cleanup() {
        clearInterval(intervalRef.current);
        };
    }, []);

    function convertStringToTime(date: Date, time: string) {
        const dateString = moment(date).format("L");
        return moment(`${dateString} ${time}`).format("LTS");
    }
    const convertedEndTime = convertStringToTime(date, endTime);
    const nowTime = moment(date).format("LTS");

    const startTime = moment(nowTime, "HH:mm:ss a");
    const endedTime = moment(convertedEndTime, "HH:mm:ss a");
    const dif = moment.duration(endedTime.diff(startTime));

    console.log(`${dif.hours()} hours, ${dif.minutes()} mins, ${dif.seconds()} secs`);

    const totalSecs = Math.floor(
        dif.hours() * 3600 + dif.minutes() * 60 + dif.seconds()
    );


    let completed = 100 - totalSecs / 100;

    if (completed === 100) {
        clearInterval(intervalRef.current);
    }

    const fillerStyles: React.CSSProperties = {
        height: "100%",
        width: `${completed}%`,
        backgroundColor: "red",
        borderRadius: "inherit",
        textAlign: "right"
    };
    return <div>
        <div>{date.toLocaleTimeString()}</div>
        <div className="progressContainer">
            <div style={fillerStyles}>
                <span>{`${completed}%`}</span>
                {completed === 100 && <div>Completed!</div>}
            </div>
        </div>
    </div>
}
