import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDailyTasksSelector, fetchTasks, getTasksSelector } from '../../store/reducers/tasksSlice';
import { Task } from '../../Types';
import Button, { BUTTON_TYPE } from '../button/Button';
import { TaskCard } from '../task/Task';
import { TaskForm } from '../task/TaskForm';
import { DayContainer } from './DailyTasks.style';
import { ICON_TYPE } from '../button/Icon.style';
import Sidebar from '../sidebar/Sidebar';
import { checkOverlapTask } from '../../utils/validationHelpers';
import { ButtonRow } from '../button/Button.style';
import { isOverdue } from '../../utils/dateHelpers';

type Props = {
    day: string;
};

export const DailyTasks = ({ day }: Props) => {
    const [openForm, setOpenForm] = useState(false);
    const dispatch = useAppDispatch();

    const { status, error } = useAppSelector(getTasksSelector());

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTasks());
        }
    }, []);

    const dailyTasks = useAppSelector(getDailyTasksSelector(day));
    //I have to sort here since prisma sort doesn't work on the back end
    const sortedDailyTasks = dailyTasks.sort((a, b) => (a.start > b.start ? 1 : -1));

    return (
        <>
            {status === 'loading' && <h2>🌀 Loading...</h2>}
            {error && <h2>Something went wrong</h2>}
            <ButtonRow pt="1" pr="6" pb="1" $end>
                <Button
                    icon={ICON_TYPE.add}
                    btnType={BUTTON_TYPE.button}
                    onClick={() => setOpenForm(true)}
                    disabled={isOverdue(new Date(day))}
                >
                    Add Task
                </Button>
            </ButtonRow>
            <DayContainer>
                {openForm && (
                    <Sidebar onClick={() => setOpenForm(false)} isActive={openForm}>
                        <TaskForm activeDay={day} setOpenForm={setOpenForm} isTaskOverlap={isTaskOverlap} />
                    </Sidebar>
                )}
                {sortedDailyTasks.map((task: Task) => {
                    return <TaskCard task={task} key={task.id} isTaskOverlap={isTaskOverlap} />;
                })}
            </DayContainer>
        </>
    );

    //TODO refactor validations
    function isTaskOverlap(task: Task): boolean {
        const overlappedTasks = sortedDailyTasks.filter(
            (existTask: Task) => existTask.id !== task.id && checkOverlapTask(existTask, task)
        );
        return overlappedTasks.length ? true : false;
    }
};
