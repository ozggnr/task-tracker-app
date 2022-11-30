import { useEffect, useState } from 'react';
import { getTasks } from '../services/taskService';
import { Task } from '../Types';
import { longDateFormat } from '../utils/dateHelpers';
import { TaskComponent } from './task/TaskComponent';

interface Props {
    day: string;
}
export const DailyTasks = ({ day }: Props) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getTasks().then((tasks) => setTasks(tasks));
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
