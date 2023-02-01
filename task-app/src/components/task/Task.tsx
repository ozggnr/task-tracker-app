import { PropsWithChildren, useState } from 'react';
import { Task } from '../../Types';
import { ProgressBar } from '../progressBar/ProgressBar';
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
import { ButtonGroup } from '../button/Button.style';

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

    return (
        <TaskContainer>
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
                        <Button icon={ICON_TYPE.edit} color={BUTTON_COLOR.edit} onClick={() => setOpenForm(true)}>
                            Edit
                        </Button>
                    </ButtonGroup>
                </CardHeader>
                <CardBody>
                    {/* <div>{activeTask.date.toLocaleTimeString()}</div> */}
                    <ProgressBar startTime={activeTask.start} endTime={activeTask.end} />
                    <div className="task">
                        <div className="col-1">{activeTask.status}</div>
                        <div className="col-1">
                            {activeTask.start} - {activeTask.end}
                        </div>

                        <div className="col-1">
                            <div className="task-title">{activeTask.title}</div>
                            <div className="task-desc">{activeTask.description}</div>
                        </div>
                    </div>
                </CardBody>

                <CardFooter>
                    {activeTask.status === 'NOT_COMPLETED' && (
                        <Button color={BUTTON_COLOR.button} onClick={handleCompleteTask}>
                            Completed
                        </Button>
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
