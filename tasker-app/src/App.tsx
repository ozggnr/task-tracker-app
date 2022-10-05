import '@fullcalendar/react/dist/vdom'

import { useState } from 'react'
import moment from 'moment';
import './App.css'

const getWeekdays = () => {
  let calendar: moment.Moment[] = []
  const startWeek = moment().startOf('week');
  const endWeek = moment().endOf('week');
  let start = startWeek.day()

  while(start <= endWeek.day()) {
    calendar.push(startWeek.clone())
    startWeek.add(1, 'day')
    start++
  }
  return calendar
}

function App() {
  const [activeDay, setActiveDay] = useState(moment())
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
    setActiveDay(selectedDay)
  }
  function getDailyTasks(selectedDay: string) {
    return tasks.filter(task => task.date === selectedDay)
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(typeof e.currentTarget.value)
  }
  // Moment(new Date(date)).format('MM/DD/YYYY') --> to get rid of the moment deprecated warning
  //key is not good :(
  return (<>
    <div className='carousel'>
      {getWeekdays().map((day,i) => {
        return <div key={i} className={moment(activeDay.format('DD MMMM YYYY')).isSame(day.format('DD MMMM YYYY')) ? 'active' : ''} onClick={() => handleClick(day)}>{day.format('MMMM D')}</div>
        
      })}
    </div>
    <div className='daily-tasks-page'>
    {getDailyTasks(activeDay.format('DD MMMM YYYY')).map(task => {
      console.log(new Date(task.start))
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


