import { PropsWithChildren, useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { deleteTaskService, updateTaskService } from '../../services/taskService';
import { deleteTask, updateTask } from '../../store/reducers/tasksSlice';
import { Task } from '../../Types';
import { getStatusText, isCompleted, isInProgress, isNotCompleted } from '../../utils/taskHelpers';
import { convertStringToDate, isOverdue } from '../../utils/dateHelpers';
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
import { CardBody, CardButtonGroup, CardFooter, CardHeader } from '../card/Card.style';
import { TaskContainer, TaskTitle, TaskInfo, TaskDescription, TaskStatus, TaskStatusRow } from './Task.style';
import { ICON_TYPE } from '../button/Icon.style';
import { FormButtonRow } from '../form/Form.style';

type TaskProps = {
    task: Task;
    isTaskOverlap: (task: Task) => boolean;
};

export const TaskCard = ({ task, isTaskOverlap }: PropsWithChildren<TaskProps>) => {
    const dispatch = useAppDispatch();
    const [openForm, setOpenForm] = useState(false);
    const [warning, setWarning] = useState(false);
    const activeTask = useTaskStatus(task);
    const [openDetails, setOpenDetails] = useState(false);
    //scroll to active task
    const scrollRef = useRef<null | HTMLDivElement>(null);
    const executeScroll = () =>
        scrollRef!.current!.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    useEffect(() => {
        if (format(new Date(), 'HH:mm') >= activeTask.start) executeScroll();
        if (openDetailPage(activeTask)) {
            setOpenDetails(true);
        }
    }, [activeTask.status]);

    const openDetailPage = (task: Task) => (isInProgress(task.status!) && task.subTasks.length ? true : false);
    const isTaskOverdue = isOverdue(convertStringToDate(activeTask.date)) ? true : false;

    return (
        <TaskContainer ref={scrollRef} overdue={isTaskOverdue} isActive={openDetails}>
            <ProgressBar
                startTime={activeTask.start!}
                endTime={activeTask.end!}
                date={task.date}
                status={activeTask.status}
            />
            <Card cardActive={openDetails} statusWarning={activeTask.status}>
                <CardHeader>
                    <TaskStatusRow>
                        <TaskStatus statusWarning={activeTask.status}>{getStatusText(activeTask.status!)}</TaskStatus>
                    </TaskStatusRow>
                    {!isCompleted(activeTask.status!) && (
                        <CardButtonGroup>
                            <Button
                                btnType={BUTTON_TYPE.delete}
                                icon={ICON_TYPE.delete}
                                onClick={() => setWarning(true)}
                                disabled={isTaskOverdue}
                                tooltip="Delete Task"
                            />
                            <Button
                                btnType={BUTTON_TYPE.secondary}
                                icon={ICON_TYPE.edit}
                                onClick={() => {
                                    setOpenForm(true);
                                    executeScroll();
                                }}
                                disabled={isTaskOverdue}
                                tooltip="Edit Task"
                            />
                            <Button
                                btnType={BUTTON_TYPE.secondary}
                                icon={ICON_TYPE.open}
                                onClick={() => {
                                    setOpenDetails(true);
                                    executeScroll();
                                }}
                                disabled={isTaskOverdue}
                                tooltip="Open Task Details"
                            />
                            {warning && (
                                <Modal onClick={() => setWarning(false)} size="small">
                                    <div>Do you want to delete this task?</div>
                                    <FormButtonRow>
                                        <Button btnType={BUTTON_TYPE.link}>Cancel</Button>
                                        <Button btnType={BUTTON_TYPE.primary} onClick={handleConfirm}>
                                            Confirm
                                        </Button>
                                    </FormButtonRow>
                                </Modal>
                            )}
                        </CardButtonGroup>
                    )}
                </CardHeader>
                <CardBody>
                    <TaskTitle>
                        {activeTask.title}
                        <TaskInfo>{` ~ ${activeTask?.subTasks.length} SubTask(s)`}</TaskInfo>
                    </TaskTitle>
                    <TaskDescription>{activeTask.description}</TaskDescription>
                </CardBody>
                <CardFooter>
                    {isNotCompleted(activeTask.status!) && (
                        <Checkbox
                            name="completed"
                            label="Completed"
                            value={activeTask.status}
                            onClick={handleCompleteTask}
                            disabled={isTaskOverdue}
                        />
                    )}
                </CardFooter>
            </Card>
            {openForm && (
                <Modal onClick={() => setOpenForm(false)} size="large">
                    <TaskForm task={activeTask} setOpenForm={setOpenForm} isTaskOverlap={isTaskOverlap} />
                </Modal>
            )}
            {openDetails && (
                <Sidebar onClick={() => setOpenDetails(false)} isActive={openDetails}>
                    <TaskDetails activeTask={activeTask} setOpenDetails={setOpenDetails} />
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
