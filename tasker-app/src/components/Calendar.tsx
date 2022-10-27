import moment from "moment";
import { useState } from "react";
import { DailyTasks } from "./DailyTasks";
import { TaskForm } from "./TaskForm";

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

export const Calendar = () => {
    const todayMomentObj = moment();
    const [openForm, setOpenForm] = useState(false)
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
        <div>
            <button onClick={() => setOpenForm(true)}>Create New Task</button>
        </div>
        {openForm && <TaskForm />}
        <div className='dates'>
            {calendar.map((day,i) => {
                const selectedDay = moment(activeDay.format('DD MMMM YYYY')).isSame(day.format('DD MMMM YYYY'))
                return <div key={i} className={'date' + (selectedDay ? ' active' : '')} onClick={() => handleClick(day)}>{day.format('ddd D')}</div>
                
            })}
        </div>
        <DailyTasks day={activeDay} />
    </div>)

    function handleClick(selectedDay: moment.Moment) {
        setActiveDay(selectedDay);
    }
    
    function getWeekdays(weekSts: String, calendar: moment.Moment[]) {
        console.log(calendar)
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



