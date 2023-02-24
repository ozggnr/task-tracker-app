import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDailyTasksSelector, fetchTasks, getTasksSelector } from '../../store/reducers/tasksSlice';
import { Task } from '../../Types';
import Button, { BUTTON_TYPE } from '../button/Button';
import { TaskCard } from '../task/Task';
import { TaskForm } from '../task/TaskForm';
import { checkOverlapTask } from '../../utils/validationHelpers';
import { isOverdue } from '../../utils/dateHelpers';
import { Loading } from '../loading/Loading';
import { Message, SEVERITY_TYPE } from '../message/Message';
import { DayContainer } from './DailyTasks.style';
import { ICON_SIZE, ICON_TYPE } from '../button/Icon.style';
import Modal from '../modal/Modal';
import { Row } from '../../Main.style';

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

    if (status === 'loading') {
        return <Loading />;
    } else if (error) {
        return (
            <Message
                message={error}
                severity={SEVERITY_TYPE.error}
                withIcon={{ icon: ICON_TYPE.error, size: ICON_SIZE.large }}
            />
        );
    }

    return (
        <>
            <Row pt="1" pr="6" pb="1" $end>
                <Button
                    icon={ICON_TYPE.add}
                    btnType={BUTTON_TYPE.link}
                    onClick={() => setOpenForm(true)}
                    disabled={isOverdue(new Date(day))}
                >
                    Add Task
                </Button>
            </Row>
            <DayContainer>
                {openForm && (
                    <Modal onClick={() => setOpenForm(false)} size="large">
                        <TaskForm activeDay={day} setOpenForm={setOpenForm} isTaskOverlap={isTaskOverlap} />
                    </Modal>
                )}
                {sortedDailyTasks.map((task: Task) => {
                    return <TaskCard task={task} key={task.id} isTaskOverlap={isTaskOverlap} />;
                })}
            </DayContainer>
        </>
    );

    function isTaskOverlap(task: Task): boolean {
        const overlappedTasks = sortedDailyTasks.filter(
            (existTask: Task) => existTask.id !== task.id && checkOverlapTask(existTask, task)
        );
        return overlappedTasks.length ? true : false;
    }
};
