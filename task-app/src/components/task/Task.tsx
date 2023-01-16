import {
    PropsWithChildren,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react';
import { Task } from '../../Types';
import { ProgressBar } from '../progressBar/ProgressBar';
import Modal from '../modal/Modal';
import { deleteTask, updateTask } from '../../services/taskService';
import { ICON_TYPE } from '../button/Icon.style';
import { TaskForm } from './TaskForm';
import Sidebar from '../sidebar/Sidebar';
import { TaskContainer } from './Task.style';
import { CardBody, CardFooter, CardHeader } from '../card/Card.style';
import Card from '../card/Card';
import Button, { BUTTON_TYPE } from '../button/Button';
import { TaskDetails } from './TaskDetails';
import {
    getDateTime,
    timeDifferenceWithRealTime,
} from '../../utils/dateHelpers';

type TaskProps = {
    task: Task;
    setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const TaskCard = ({ task, setTasks }: PropsWithChildren<TaskProps>) => {
    const [warning, setWarning] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [status, setStatus] = useState(task.status);
    const [openDetails, setOpenDetails] = useState(false);
    const [activeTask, setActiveTask] = useState<Task>(task);

    const getRemainingSecsStart = timeDifferenceWithRealTime(
        activeTask.date,
        activeTask.start
    );
    const getRemainingSecsEnd = timeDifferenceWithRealTime(
        activeTask.date,
        activeTask.end
    );
    const taskStartDate = getDateTime(
        new Date(activeTask.date),
        activeTask.start
    );
    const taskEndDate = getDateTime(new Date(activeTask.date), activeTask.end);
    const now = new Date();

    useEffect(() => {
        let timerId: number;
        if (status !== 'COMPLETED') {
            if (now >= taskStartDate && now < taskEndDate) {
                setStatus('IN_PROGRESS');
                timerId = schedule(getRemainingSecsEnd, 'NOT_COMPLETED');
            } else if (now < taskStartDate) {
                setStatus('NOT_STARTED');
                timerId = schedule(getRemainingSecsStart, 'IN_PROGRESS');
            } else {
                setStatus('NOT_COMPLETED');
            }
            setActiveTask((t) => ({ ...t, status: status }));
        }
        return () => clearTimeout(timerId);
    }, [status, openForm]); //added open form to render after edit form

    return (
        <TaskContainer>
            <Card cardActive={openForm}>
                <CardHeader>
                    <div>
                        <Button
                            icon={ICON_TYPE.delete}
                            type={BUTTON_TYPE.delete}
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
                            type={BUTTON_TYPE.edit}
                            onClick={() => setOpenForm(true)}
                        >
                            Edit
                        </Button>
                        {activeTask.status === 'NOT_COMPLETED' && (
                            <Button
                                type={BUTTON_TYPE.button}
                                onClick={handleCompleteTask}
                            >
                                Mark as Completed
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardBody>
                    {/* <div>{date.toLocaleTimeString()}</div> */}
                    <ProgressBar
                        startTime={activeTask.start}
                        endTime={activeTask.end}
                    />
                    <div className="task">
                        <div className="col-1">{activeTask.status}</div>
                        <div className="col-1">
                            {activeTask.start} - {activeTask.end}
                        </div>

                        <div className="col-1">
                            <div className="task-title">{activeTask.title}</div>
                            <div className="task-desc">
                                {activeTask.description}
                            </div>
                        </div>
                    </div>
                </CardBody>

                <CardFooter></CardFooter>
            </Card>
            {openForm && (
                <Sidebar onClick={() => setOpenForm(false)} isActive={openForm}>
                    <TaskForm
                        setOpenForm={setOpenForm}
                        task={activeTask}
                        handleUpdateTask={handleUpdateTask}
                    />
                </Sidebar>
            )}
            {openDetails && (
                <Sidebar
                    onClick={() => setOpenDetails(false)}
                    isActive={openDetails}
                >
                    <TaskDetails task={activeTask} />
                </Sidebar>
            )}
        </TaskContainer>
    );

    function handleConfirm() {
        return deleteTask(task.id!).then(() => {
            setWarning(false);
            setTasks((prev) =>
                prev.filter((prevTask) => prevTask.id !== task.id)
            );
        });
    }

    function schedule(timeToSet: number, taskStatus: string) {
        const timerId = setTimeout(() => {
            setStatus(taskStatus);
        }, timeToSet * 1000);
        return timerId;
    }

    function handleUpdateTask(task: Task) {
        setActiveTask(task);
    }

    function handleCompleteTask() {
        const status = 'COMPLETED';
        const completedTask = { ...task, status: status };
        updateTask(completedTask).then((newTask) => {
            setActiveTask(newTask);
            setStatus(status);
        });
    }
};
