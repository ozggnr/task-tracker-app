import moment from "moment";
import { useState, FormEvent, ChangeEvent } from "react";
import DailyTasks from "./DailyTasks";
import { Form } from './Form';

import { Task } from '../Types';

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

interface Props {
    tasks: Task[]
}

export const Calendar = (props: Props) => {
    const todayMomentObj = moment();
    const { tasks } = props;
    const [taskInputFields, setTaskInputFields] = useState<Task>({
        date: "",
        title: "",
        desc: "",
        start: "",
        end: "",
        completed: false,
        repeat: ""
      })
    const [openForm, setOpenForm] = useState(false)
    const [activeDay, setActiveDay] = useState(todayMomentObj);
    const [calendar, setCalendar] = useState(() => getWeeklyCalendar(todayMomentObj)); //---> this needs to be refactored, find another solution
    console.log(calendar)
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
        {openForm && <Form handleSubmit={handleFormSubmit}>
            <label>Task Title</label>
            <input type='text' name='title' value={taskInputFields.title} onChange={handleChange}/>
            <label>Task Description</label>
            <input type='text' name='desc' value={taskInputFields.desc} onChange={handleChange}/>
            <label>Date</label>
            <input type='date' name='date' value={taskInputFields.date} onChange={handleChange}/>
            <label>Time</label>
            <input type='time' name='start' value={taskInputFields.start} onChange={handleChange}/>
            <button type='submit' onClick={() => setOpenForm(false)}>Save</button>
        </Form>}
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
        console.log(selectedDay)
        console.log(tasks)
        return tasks.filter(task => moment(task.date).format('DD MMMM YYYY') === selectedDay);
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
    function handleFormSubmit(e: FormEvent) {
        e.preventDefault()
        console.log('onSubmit', taskInputFields)
        fetch('/tasks.json').then(response => response.json()).then(data => {
          console.log(data)
          data.push(taskInputFields)
        //   setAllTasks(data)
        //   console.log(data)
        })
    
      }
      
      function handleChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const name = event.target.name
        setTaskInputFields({...taskInputFields, [name]: event.target.value})
      }
}



