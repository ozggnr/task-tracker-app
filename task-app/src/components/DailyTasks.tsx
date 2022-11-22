import axios from 'axios';
import { useEffect, useState } from 'react';
import { Task } from '../Types';
import { longDateFormat } from '../utils/dateHelpers';
import { TaskComponent } from './task/TaskComponent';

interface Props {
    day: string;
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

    const dailyTasks = getDailyTasks(day);

    return (
        <div className="daily-tasks-page">
            {dailyTasks.map((task) => {
                return <TaskComponent task={task} />;
            })}
        </div>
    );

    function getDailyTasks(selectedDay: string) {
        return tasks.filter(
            (task) => longDateFormat(task.date) === selectedDay
        );
    }
};
