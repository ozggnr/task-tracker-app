import '@fullcalendar/react/dist/vdom';

import { useState } from 'react';
import moment from 'moment';
import './App.css'

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
function App() {
  const [activeDay, setActiveDay] = useState(moment());
  const [calendar, setCalendar] = useState(getWeeklyCalendar(moment()));
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
  
  // Moment(new Date(date)).format('MM/DD/YYYY') --> to get rid of the moment deprecated warning
  //key is not good :(
  return (<>
  <button onClick={() => getWeekdays('last', calendar)}>Last Week</button>
    <div className='carousel'>
      {calendar.map((day,i) => {
        return <div key={i} className={moment(activeDay.format('DD MMMM YYYY')).isSame(day.format('DD MMMM YYYY')) ? 'active' : ''} onClick={() => handleClick(day)}>{day.format('MMMM D')}</div>
        
      })}
    </div>
    <button onClick={() => getWeekdays('next', calendar)}>Next Week</button>
    <div className='daily-tasks-page'>
    {getDailyTasks(activeDay.format('DD MMMM YYYY')).map(task => {
        return <div className='task'>
          <div className='task-time'>{task.start}</div>
          <div className='task-def'>
            <div className='task-title'>{task.title}</div>
            <div className='task-desc'>{task.desc}</div>
          </div>
        </div>})}
      </div>
  </>)
}

export default App


