import moment from "moment";
import { useState, useEffect } from "react";
import DailyTasks from "./DailyTasks";

const getWeeklyCalendar = (day: moment.Moment) => {
  let calendar: moment.Moment[] = [];
  let startWeek = moment(day).startOf('week');
  let endWeek = moment(day).endOf('week');
  let start = startWeek.day();
  while(start <= endWeek.day()) {
    calendar.push(startWeek.clone());
    startWeek.add(1, 'day');
    start++;
  }
  return calendar;
}
interface Task {
    id?: number,
    date: string,
    title: string,
    desc: string,
    start: string,
    end: string,
    completed: boolean,
    repeat: string
}
interface Props {
    tasks: Task[]
}
const Calendar = (props: Props) => {
    const todayMomentObj = moment();
    const { tasks } = props;
    const [activeDay, setActiveDay] = useState(todayMomentObj);
    const [calendar, setCalendar] = useState(() => getWeeklyCalendar(todayMomentObj)); //---> this needs to be refactored, find another solution
   
    // Moment(new Date(date)).format('MM/DD/YYYY') --> to get rid of the moment deprecated warning
    //key is not good :(
    return (<div className="calendar">
        <div className='dates-top'>
        <div>{activeDay.format('MMMM YYYY')}</div>
        <div className='button-group-week'>
            <button onClick={() => getWeekdays('last', calendar)}>{"<"}</button>
            <button onClick={() => getWeekdays('today', calendar)}>Today</button>
            <button onClick={() => getWeekdays('next', calendar)}>{">"}</button>
        </div>
        </div>
        <div className='dates'>
        {calendar.map((day,i) => {
            const selectedDay = moment(activeDay.format('DD MMMM YYYY')).isSame(day.format('DD MMMM YYYY'))
            return <div key={i} className={'date' + (selectedDay ? ' active' : '')} onClick={() => handleClick(day)}>{day.format('ddd D')}</div>
            
        })}
        </div>
        <DailyTasks tasks={getDailyTasks(activeDay.format('DD MMMM YYYY'))} className='mt-2'/>
        
    </div>)

    function handleClick(selectedDay: moment.Moment) {
        setActiveDay(selectedDay);
    }
    function getDailyTasks(selectedDay: string) {
        return tasks.filter(task => moment(task.date).format('DD MMMM YYYY') === selectedDay);
    }
    
    function getWeekdays(weekSts: String, calendar: moment.Moment[]) {
        if (weekSts === 'next') {
            const nextWeekStartDay = calendar[0].add(1, 'week');
            const nextWeekDays = getWeeklyCalendar(nextWeekStartDay);
            setCalendar(nextWeekDays);
            setActiveDay(nextWeekStartDay.startOf('week'));
        } else if (weekSts === 'last') {
            const lastWeekStartDay = calendar[0].subtract(1, 'week');
            const lastWeekDays = getWeeklyCalendar(lastWeekStartDay);
            setCalendar(lastWeekDays);
            setActiveDay(lastWeekStartDay.startOf('week'));
        } else {
            setCalendar(getWeeklyCalendar(moment()));
            setActiveDay(moment());
        }
    }
    }

    export default Calendar;


