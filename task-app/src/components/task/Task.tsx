import { PropsWithChildren, useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { deleteTaskService, updateTaskService } from '../../services/taskService';
import { deleteTask, updateTask } from '../../store/reducers/tasksSlice';
import { Task } from '../../Types';
import { isCompleted, isInProgress, isNotCompleted, isNotStarted, isOverdue } from '../../utils/validationHelpers';
import { useTaskStatus } from '../../utils/useTaskStatus';
import { useAppDispatch } from '../../store/hooks';
import Modal from '../modal/Modal';
import Button, { BUTTON_TYPE } from '../button/Button';
import { Checkbox } from '../button/Checkbox';
import Sidebar from '../sidebar/Sidebar';
import { ProgressBar } from '../progressBar/ProgressBar';
import Card from '../card/Card';
import { TaskForm } from './TaskForm';
import { TaskDetails } from './TaskDetails';
import { CardBody, CardFooter, CardHeader } from '../card/Card.style';
import { TaskContainer, TaskTitle, TaskInfo, TaskDescription } from './Task.style';
import { ButtonRow } from '../button/Button.style';
import { ICON_TYPE } from '../button/Icon.style';

type TaskProps = {
    task: Task;
    isTaskOverlap: (task: Task) => boolean;
};

export const TaskCard = ({ task, isTaskOverlap }: PropsWithChildren<TaskProps>) => {
    const [openForm, setOpenForm] = useState(false);
    const [warning, setWarning] = useState(false);
    const dispatch = useAppDispatch();
    const activeTask = useTaskStatus(task);
    const [openDetails, setOpenDetails] = useState(true);
    //scroll to active task
    const scrollRef = useRef<null | HTMLDivElement>(null);
    const executeScroll = () => scrollRef!.current!.scrollIntoView({ behavior: 'smooth', block: 'center' });
    useEffect(() => {
        if (format(new Date(), 'HH:mm') >= activeTask.start) executeScroll();
    }, []);

    const openDetailPage = (task: Task) => (isInProgress(task.status!) && task.subTasks.length ? true : false);
    const isTaskOverdue = isOverdue(new Date(activeTask.date)) ? true : false;
    const isCardActive = openForm || (openDetails && openDetailPage(activeTask));

    return (
        <TaskContainer ref={scrollRef} overdue={isTaskOverdue} cardActive={isCardActive}>
            <ProgressBar startTime={activeTask.start!} endTime={activeTask.end!} status={activeTask.status} />
            <Card cardActive={isCardActive} statusWarning={activeTask.status}>
                <CardHeader>
                    <TaskInfo>
                        {isNotStarted(activeTask.status!) ? '2 hours left' : activeTask.status}{' '}
                        {` ~ ${activeTask?.subTasks.length} SubTask(s)`}
                    </TaskInfo>
                    {!isCompleted(activeTask.status!) && (
                        <ButtonRow $end width="30">
                            <Button
                                icon={ICON_TYPE.delete}
                                btnType={BUTTON_TYPE.delete}
                                onClick={() => setWarning(true)}
                                disabled={isTaskOverdue}
                            >
                                Delete
                            </Button>
                            <Button
                                icon={ICON_TYPE.edit}
                                btnType={BUTTON_TYPE.secondary}
                                onClick={() => {
                                    setOpenForm(true);
                                    executeScroll();
                                }}
                                disabled={isTaskOverdue}
                            >
                                Edit
                            </Button>
                            {warning && (
                                <Modal onClick={() => setWarning(false)}>
                                    <div>Do you want to delete this task?</div>
                                    <ButtonRow $center width="40" pb="0.5">
                                        <Button btnType={BUTTON_TYPE.button} onClick={handleConfirm}>
                                            Confirm
                                        </Button>
                                        <Button btnType={BUTTON_TYPE.secondary}>Cancel</Button>
                                    </ButtonRow>
                                </Modal>
                            )}
                        </ButtonRow>
                    )}
                </CardHeader>
                <CardBody>
                    <TaskTitle>{activeTask.title}</TaskTitle>
                    <TaskDescription>{activeTask.description}</TaskDescription>
                </CardBody>
                <CardFooter>
                    {isNotCompleted(activeTask.status!) && (
                        <ButtonRow $end>
                            <Checkbox
                                name="completed"
                                label="Completed"
                                value={activeTask.status}
                                onClick={handleCompleteTask}
                                disabled={isTaskOverdue}
                            />
                        </ButtonRow>
                    )}
                </CardFooter>
            </Card>
            {openForm && (
                <Sidebar onClick={() => setOpenForm(false)} isActive={openForm}>
                    <TaskForm task={activeTask} setOpenForm={setOpenForm} isTaskOverlap={isTaskOverlap} />
                </Sidebar>
            )}
            {/* TODO - add click event to see details when we click */}
            {openDetails && openDetailPage(activeTask) && (
                <Sidebar onClick={() => setOpenDetails(false)} isActive={openDetails && openDetailPage(activeTask)}>
                    <TaskDetails activeTask={activeTask} openDetails={openDetailPage(activeTask)} />
                </Sidebar>
            )}
        </TaskContainer>
    );

    function handleConfirm() {
        return deleteTaskService(activeTask.id!).then(() => {
            setWarning(false);
            dispatch(deleteTask(activeTask));
        });
    }

    function handleCompleteTask() {
        const status = 'COMPLETED';
        const completedTask = { ...activeTask, status: status };
        updateTaskService(completedTask).then((newTask) => {
            dispatch(updateTask(newTask));
        });
    }
};
