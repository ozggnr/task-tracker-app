import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDailyTasksSelector, setTasks } from '../../store/reducers/tasksSlice';
import { getTasks } from '../../services/taskService';
import { Task } from '../../Types';
import Button, { BUTTON_COLOR } from '../button/Button';
import { TaskCard } from '../task/Task';
import { TaskForm } from '../task/TaskForm';
import { DayContainer } from './DailyTasks.style';
import { Row } from '../../App.style';
import { ICON_TYPE } from '../button/Icon.style';
import Sidebar from '../sidebar/Sidebar';
import { checkOverlapTask } from '../../utils/validationHelpers';

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
                <Button icon={ICON_TYPE.add} color={BUTTON_COLOR.button} onClick={() => setOpenForm(true)}>
                    Add Task
                </Button>
            </Row>
            {openForm && (
                <Sidebar onClick={() => setOpenForm(false)} isActive={openForm}>
                    <TaskForm activeDay={day} setOpenForm={setOpenForm} isTaskOverlap={isTaskOverlap} />
                </Sidebar>
            )}
            {dailyTasks.map((task: Task) => {
                return <TaskCard task={task} key={task.id} isTaskOverlap={isTaskOverlap} />;
            })}
        </DayContainer>
    );

    //TODO refactor validations
    function isTaskOverlap(task: Task) {
        const overlappedTasks = dailyTasks.filter((existTask) => checkOverlapTask(existTask, task));
        return overlappedTasks.length ? true : false;
    }
};
