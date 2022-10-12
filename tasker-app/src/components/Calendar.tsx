import moment from "moment";
import { useState } from "react";
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
const Calendar = () => {
    const todayMomentObj = moment()
    const [activeDay, setActiveDay] = useState(todayMomentObj);
    const [calendar, setCalendar] = useState(() => getWeeklyCalendar(todayMomentObj)); //---> create calendar compoenent and send the active day
    const tasks = [
        {
        id: 1,
        date: '05 October 2022',
        title: 'Workout',
        desc: '',
        start: '8:30',
        end: '9:00',
        completed: true,
        repeat: ''
        },
        {
        id: 2,
        date: '02 October 2022',
        title: 'House',
        desc: 'Rearrange closet',
        start: '12:30',
        end: '14:00',
        completed: true,
        repeat: ''
        },
        {
        id: 3,
        date: '07 October 2022',
        title: 'Shopping',
        desc: 'Go to grocery store',
        start: '17:30',
        end: '18:30',
        completed: false,
        repeat: ''
        },
        {
        id: 4,
        date: '05 October 2022',
        title: 'Coding',
        desc: 'Complete react lesson',
        start: '9:00',
        end: '11:00',
        completed: false,
        repeat: ''
        }
    ]
    
    // Moment(new Date(date)).format('MM/DD/YYYY') --> to get rid of the moment deprecated warning
    //key is not good :(
        console.log(calendar)
    return (<div className="calendar">
        <div className='dates-top'>
        <div>{activeDay.format('MMMM YYYY')}</div>
        <div className='button-group-week'>
            <button onClick={() => getWeekdays('last', calendar)}>{"<"}</button>
            <button onClick={() => getWeeklyCalendar(todayMomentObj)}>Today</button>
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
        return tasks.filter(task => task.date === selectedDay);
    }
    
    function getWeekdays(weekSts: String, calendar: moment.Moment[]) {
        if (weekSts === 'next') {
        const nextWeekStartDay = calendar[0].add(1, 'week');
        const nextWeekDays = getWeeklyCalendar(nextWeekStartDay);
        setCalendar(nextWeekDays);
        setActiveDay(nextWeekStartDay.startOf('week'));
        } 
        if (weekSts === 'last') {
        const lastWeekStartDay = calendar[0].subtract(1, 'week');
        const lastWeekDays = getWeeklyCalendar(lastWeekStartDay);
        setCalendar(lastWeekDays);
        setActiveDay(lastWeekStartDay.startOf('week'));
        }
    }
    }

    export default Calendar;


