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
import { DeleteIcon, EditIcon } from '../button/Icon.style';
import { TaskForm } from './TaskForm';
import Sidebar from '../sidebar/Sidebar';

type TaskProps = {
    task: Task;
    setTasks: Dispatch<SetStateAction<Task[]>>;
    // onClick: MouseEventHandler<HTMLButtonElement>;
};

export const TaskComponent = ({
    task,
    setTasks,
}: PropsWithChildren<TaskProps>) => {
    const [warning, setWarning] = useState(false);
    const [details, setDetails] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    // console.log('in comp', task);
    return (
        <div className="taskContainer" onClick={() => console.log(task)}>
            <ProgressBar />
            <div className="task">
                <div className="col-1">{task.start}</div>
                <div className="col-1">
                    <div className="task-title">{task.title}</div>
                    <div className="task-desc">{task.description}</div>
                </div>
            </div>
            <div>
                <DeleteIcon onClick={() => setWarning(true)} />
                {warning && (
                    <Modal onClick={() => setWarning(false)}>
                        Do you want to delete this task?
                        <button onClick={handleConfirm}>confirm</button>
                        <button>cancel</button>
                    </Modal>
                )}
                <EditIcon onClick={() => setOpenForm(true)} />
                {openForm && (
                    <Sidebar onClick={() => setOpenForm(false)}>
                        <TaskForm
                            setOpenForm={setOpenForm}
                            setTasks={setTasks}
                            task={task}
                        />
                    </Sidebar>
                )}
            </div>
            {details && <div>show details</div>}
        </div>
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
