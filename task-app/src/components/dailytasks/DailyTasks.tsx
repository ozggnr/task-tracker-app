import { useEffect, useState } from 'react';
import { getTasks } from '../../services/taskService';
import { Task } from '../../Types';
import {
    differenceSeconds,
    isTheSameSecond,
    longDateFormat,
} from '../../utils/dateHelpers';
import Button from '../button/Button';
import { TaskCard } from '../task/Task';
import { TaskForm } from '../task/TaskForm';
import { DayContainer } from './DailyTasks.style';
import { Row } from '../../App.style';
import { AddIcon } from '../button/Icon.style';
import Sidebar from '../sidebar/Sidebar';
import { getTime } from '../../utils/getTime';
import { format } from 'date-fns';

type Props = {
    day: string;
};

export const DailyTasks = ({ day }: Props) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const dailyTasks = getDailyTasks(day);

    //TODO try redux toolkit to fetch data
    useEffect(() => {
        getTasks().then((tasks) => setTasks(tasks));
    }, []);

    return (
        <DayContainer>
            <Row>
                <Button onClick={() => setOpenForm(true)}>
                    <AddIcon />
                    Add Task
                </Button>
            </Row>
            {openForm && (
                <Sidebar onClick={() => setOpenForm(false)} isActive={openForm}>
                    <TaskForm
                        activeDay={day}
                        setOpenForm={setOpenForm}
                        setTasks={setTasks}
                    />
                </Sidebar>
            )}
            {dailyTasks.map((task) => {
                return (
                    <TaskCard task={task} setTasks={setTasks} key={task.id} />
                );
            })}
        </DayContainer>
    );

    function getDailyTasks(selectedDay: string) {
        return tasks.filter(
            (task) => longDateFormat(task.date) === selectedDay
        );
    }
};
