import { useEffect, useState } from 'react';
import { getTasks } from '../../services/taskService';
import { Task } from '../../Types';
import { longDateFormat } from '../../utils/dateHelpers';
import Button from '../button/Button';
import { TaskComponent } from '../task/TaskComponent';
import { TaskForm } from '../task/TaskForm';
import { DayContainer } from './DailyTasks.style';
import { Row } from '../../App.style';
import { AddIcon } from '../button/Icon.style';
import Sidebar from '../sidebar/Sidebar';

type Props = {
    day: string;
};

export const DailyTasks = ({ day }: Props) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [openForm, setOpenForm] = useState(false);

    useEffect(() => {
        getTasks().then((tasks) => setTasks(tasks));
    }, []);
    console.log('tasks', tasks);
    const dailyTasks = getDailyTasks(day);

    //TODO try redux toolkit to fetch data
    return (
        <DayContainer>
            <Row>
                <Button onClick={() => setOpenForm(true)}>
                    <AddIcon />
                    Add Task
                </Button>
            </Row>
            {dailyTasks.map((existTask) => {
                return (
                    <TaskComponent
                        task={existTask}
                        setTasks={setTasks}
                        key={existTask.id}
                    />
                );
            })}
            {openForm && (
                <Sidebar onClick={() => setOpenForm(false)}>
                    <TaskForm setOpenForm={setOpenForm} setTasks={setTasks} />
                </Sidebar>
            )}
        </DayContainer>
    );

    function getDailyTasks(selectedDay: string) {
        return tasks.filter(
            (task) => longDateFormat(task.date) === selectedDay
        );
    }
};
