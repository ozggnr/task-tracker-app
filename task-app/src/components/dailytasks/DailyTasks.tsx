import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDailyTasksSelector, setTasks } from '../../store/reducers/tasksSlice';
import { getTasks } from '../../services/taskService';
import { Task } from '../../Types';
import Button from '../button/Button';
import { TaskCard } from '../task/Task';
import { TaskForm } from '../task/TaskForm';
import { DayContainer } from './DailyTasks.style';
import { Row } from '../../App.style';
import { AddIcon } from '../button/Icon.style';
import Sidebar from '../sidebar/Sidebar';
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

    const dailyTasks = useAppSelector(getDailyTasksSelector(day));

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
                    <TaskForm activeDay={day} setOpenForm={setOpenForm} validate={validateTaskTime} />
                </Sidebar>
            )}
            {dailyTasks.map((task: Task) => {
                return <TaskCard task={task} key={task.id} validate={validateTaskTime} />;
            })}
        </DayContainer>
    );

    function validateTaskTime(task: Task) {
        let message: string = '';
        const overlappingTasks = dailyTasks.filter((t) => {
            return (task.start > t.start && task.start < t.end) || (task.end > t.start && task.end < t.end);
        });

        if (overlappingTasks.length > 0) {
            message =
                'There are tasks that overlap with the start and end times of this task. Please adjust the times and try again.';
            return { isValid: false, message };
        } else {
            return { isValid: true, message };
        }
    }
};
