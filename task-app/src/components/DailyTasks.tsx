import { useEffect, useState } from 'react';
import { getTasks } from '../services/taskService';
import { Task } from '../Types';
import { longDateFormat } from '../utils/dateHelpers';
import Button from './button/button';
import { TaskComponent } from './task/TaskComponent';
import { TaskForm } from './TaskForm';

interface Props {
    day: string;
}
export const DailyTasks = ({ day }: Props) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [openForm, setOpenForm] = useState(false);

    useEffect(() => {
        getTasks().then((tasks) => setTasks(tasks));
    }, []);

    const dailyTasks = getDailyTasks(day);

    return (
        <div>
            <Button onClick={() => setOpenForm(true)} icon="add">
                Add Task
            </Button>
            {openForm && <TaskForm />}
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
