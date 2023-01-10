import {
    PropsWithChildren,
    useState,
    Dispatch,
    SetStateAction,
    MouseEventHandler,
} from 'react';
import { Task } from '../../Types';
import { ProgressBar } from '../progressBar/ProgressBar';
import Modal from '../modal/Modal';
import { deleteTask } from '../../services/taskService';
import { EditIcon, ICON_SIZE, ICON_TYPE } from '../button/Icon.style';
import { TaskForm } from './TaskForm';
import Sidebar from '../sidebar/Sidebar';
import { TaskContainer } from './TaskCard.style';
import { CardBody, CardFooter, CardHeader } from '../card/Card.style';
import Card from '../card/Card';
import Button, { BUTTON_TYPE } from '../button/Button';
import { TaskDetails } from './TaskDetails';
import { convertTimeString } from '../../utils/dateHelpers';
import { format, formatISO } from 'date-fns';

type TaskProps = {
    task: Task;
    setTasks: Dispatch<SetStateAction<Task[]>>;
    // onClick: MouseEventHandler<HTMLButtonElement>;
};

export const TaskCard = ({ task, setTasks }: PropsWithChildren<TaskProps>) => {
    const [warning, setWarning] = useState(false);
    const [details, setDetails] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    console.log(task.start, format(new Date(), 'HH:mm'));

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
                    </div>
                </CardHeader>
                <CardBody>
                    <ProgressBar startTime={task.start} endTime={task.end} />
                    <div className="task">
                        <div className="col-1">{task.status}</div>
                        <div className="col-1">
                            {task.start} - {task.end}
                        </div>

                        <div className="col-1">
                            <div className="task-title">{task.title}</div>
                            <div className="task-desc">{task.description}</div>
                        </div>
                    </div>
                </CardBody>

                <CardFooter></CardFooter>
                {details && <div>show details</div>}
            </Card>
            {openForm && (
                <Sidebar onClick={() => setOpenForm(false)} isActive={openForm}>
                    <TaskForm
                        setOpenForm={setOpenForm}
                        setTasks={setTasks}
                        task={task}
                    />
                </Sidebar>
            )}
            {openDetails && (
                <Sidebar
                    onClick={() => console.log(task)}
                    isActive={openDetails}
                >
                    <TaskDetails />
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
};
