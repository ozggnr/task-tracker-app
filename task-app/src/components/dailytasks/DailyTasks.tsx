import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getTasks } from '../../services/taskService';
import { Task } from '../../Types';
import { longDateFormat } from '../../utils/dateHelpers';
import Button from '../button/Button';
import { TaskCard } from '../task/Task';
import { TaskForm } from '../task/TaskForm';
import { DayContainer } from './DailyTasks.style';
import { Row } from '../../App.style';
import { AddIcon } from '../button/Icon.style';
import Sidebar from '../sidebar/Sidebar';
import { setTasks, tasksSelector } from '../../store/reducers/tasksSlice';
type Props = {
    day: string;
};

export const DailyTasks = ({ day }: Props) => {
    const [openForm, setOpenForm] = useState(false);
    const dispatch = useAppDispatch();
    // TODO try redux toolkit to fetch data
    useEffect(() => {
        getTasks().then((tasks) => dispatch(setTasks(tasks)));
    }, []);

    const tasks = useAppSelector(tasksSelector);
    const dailyTasks = getDailyTasks(day);
    console.log(dailyTasks);
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
                    <TaskForm activeDay={day} setOpenForm={setOpenForm} />
                </Sidebar>
            )}
            {dailyTasks.map((task: Task) => {
                return <TaskCard task={task} key={task.id} />;
            })}
        </DayContainer>
    );

    function getDailyTasks(selectedDay: string) {
        return tasks.filter((task) => longDateFormat(task.date) === selectedDay);
    }
};
