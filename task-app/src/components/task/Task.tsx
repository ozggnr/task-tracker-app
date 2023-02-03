import { PropsWithChildren, useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { deleteTaskService, updateTaskService } from '../../services/taskService';
import { deleteTask, updateTask } from '../../store/reducers/tasksSlice';
import { Task } from '../../Types';
import { isCompleted, isInProgress, isNotCompleted, isOverdue } from '../../utils/validationHelpers';
import { useTaskStatus } from '../../utils/useTaskStatus';
import { useAppDispatch } from '../../store/hooks';
import Modal from '../modal/Modal';
import Button, { BUTTON_COLOR } from '../button/Button';
import { Checkbox } from '../button/Checkbox';
import Sidebar from '../sidebar/Sidebar';
import Card from '../card/Card';
import { TaskForm } from './TaskForm';
import { TaskDetails } from './TaskDetails';
import { CardBody, CardFooter, CardHeader } from '../card/Card.style';
import { TaskContainer } from './Task.style';
import { ButtonGroup, ButtonRow } from '../button/Button.style';
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

    return (
        <TaskContainer ref={scrollRef} overdue={isOverdue(new Date(task.date))}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    fontWeight: '600',
                    width: '10%',
                }}
            >
                <div>{activeTask.start}</div>
                <div
                    style={{
                        backgroundColor: 'orange',
                        width: '0.25rem',
                        height: '100%',
                        margin: '0.5rem',
                    }}
                ></div>
                <div>{activeTask.end}</div>
            </div>
            <Card
                cardActive={openForm || (openDetails && openDetailPage(activeTask))}
                statusWarning={activeTask.status}
            >
                <CardHeader>
                    {!isCompleted(activeTask.status!) && (
                        <ButtonGroup $end>
                            <Button
                                icon={ICON_TYPE.delete}
                                color={BUTTON_COLOR.delete}
                                onClick={() => setWarning(true)}
                            >
                                Delete
                            </Button>
                            {warning && (
                                <Modal onClick={() => setWarning(false)}>
                                    Do you want to delete this task?
                                    <button onClick={handleConfirm}>confirm</button>
                                    <button>cancel</button>
                                </Modal>
                            )}
                            <Button
                                icon={ICON_TYPE.edit}
                                color={BUTTON_COLOR.edit}
                                onClick={() => {
                                    setOpenForm(true);
                                    executeScroll();
                                }}
                            >
                                Edit
                            </Button>
                        </ButtonGroup>
                    )}
                </CardHeader>
                <CardBody>
                    {/* <div>{activeTask.date.toLocaleTimeString()}</div> */}
                    {/* <ProgressBar startTime={activeTask.start} endTime={activeTask.end} /> */}
                    <div className="task">
                        <div className="col-1">{activeTask.status}</div>

                        <div className="col-1">
                            <div className="task-title">{activeTask.title}</div>
                            <div className="task-desc">{activeTask.description}</div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter>
                    {isNotCompleted(activeTask.start) && (
                        <ButtonRow position="end">
                            <Checkbox
                                name="completed"
                                label="Completed"
                                value={activeTask.status}
                                onClick={handleCompleteTask}
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
