import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Task } from '../Types';

interface Props {
  day: moment.Moment
}
export const DailyTasks = ({day}: Props) => {
	const [tasks, setTasks] = useState<Task[]>([])
	useEffect(() => {
		async function getTasks() {
			const response = await axios.get('http://localhost:5001/api/task')
			const tasks = response.data.data;
			setTasks(tasks)
		}
		getTasks()
	}, [])

    const dailyTasks = getDailyTasks(day.format('DD MMMM YYYY'))
  
    return <div className='daily-tasks-page'>
		{dailyTasks.map(task => {
			return <div className='task'>
			<div className='col-1'>{task.start}</div>
			<div className='col-1'>
				<div className='task-title'>{task.title}</div>
				<div className='task-desc'>{task.desc}</div>
			</div>
			</div>})}
      </div>

    function getDailyTasks(selectedDay: string) {
		return tasks.filter(task => moment(task.date).format('DD MMMM YYYY') === selectedDay);
    }
}
