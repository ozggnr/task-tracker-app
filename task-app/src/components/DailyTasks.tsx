import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Task } from '../Types';
import { TaskComponent } from './task/TaskComponent';

interface Props {
    day: moment.Moment;
}
export const DailyTasks = ({ day }: Props) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        async function getTasks() {
            const response = await axios.get('http://localhost:5001/api/task');
            const tasks = response.data.data;
            setTasks(tasks);
        }
        getTasks();
    }, []);

    const dailyTasks = getDailyTasks(day.format('DD MMMM YYYY'));

    return (
        <div className="daily-tasks-page">
            {dailyTasks.map((task) => {
                return <TaskComponent task={task} />;
            })}
        </div>
    );

    function getDailyTasks(selectedDay: string) {
        return tasks.filter(
            (task) => moment(task.date).format('DD MMMM YYYY') === selectedDay
        );
    }
};
