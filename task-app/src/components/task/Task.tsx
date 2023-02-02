import { PropsWithChildren, useState, useRef, useEffect } from 'react';
import { Task } from '../../Types';
import Modal from '../modal/Modal';
import { deleteTaskService, updateTaskService } from '../../services/taskService';
import { ICON_TYPE } from '../button/Icon.style';
import { TaskForm } from './TaskForm';
import Sidebar from '../sidebar/Sidebar';
import { TaskContainer } from './Task.style';
import { CardBody, CardFooter, CardHeader } from '../card/Card.style';
import Card from '../card/Card';
import Button, { BUTTON_COLOR } from '../button/Button';
import { TaskDetails } from './TaskDetails';
import { deleteTask, updateTask } from '../../store/reducers/tasksSlice';
import { useAppDispatch } from '../../store/hooks';
import { useTaskStatus } from '../../utils/useTaskStatus';
import { ButtonGroup, ButtonRow } from '../button/Button.style';
import { Checkbox } from '../button/Checkbox';
import { format } from 'date-fns';

type ValidationProps = {
    [key: string]: string;
};
type TaskProps = {
    task: Task;
    isTaskOverlap: (task: Task) => boolean;
};

export const TaskCard = ({ task, isTaskOverlap }: PropsWithChildren<TaskProps>) => {
    const [openForm, setOpenForm] = useState(false);
    const [warning, setWarning] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const dispatch = useAppDispatch();
    const activeTask = useTaskStatus(task);
    const elRef = useRef<null | HTMLDivElement>(null);
    const executeScroll = () => elRef!.current!.scrollIntoView({ behavior: 'smooth', block: 'center' });

    useEffect(() => {
        if (format(new Date(), 'HH:mm') >= activeTask.start) executeScroll();
    }, []);

    return (
        <TaskContainer ref={elRef}>
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
            <Card cardActive={openForm || openDetails}>
                <CardHeader>
                    <ButtonGroup end>
                        <Button icon={ICON_TYPE.delete} color={BUTTON_COLOR.delete} onClick={() => setWarning(true)}>
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
                    {activeTask.status === 'NOT_COMPLETED' && (
                        <ButtonRow end={true}>
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
            {openDetails && (
                <Sidebar onClick={() => setOpenDetails(false)} isActive={openDetails}>
                    <TaskDetails activeTask={activeTask} openDetails={true} />
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
