import { Dispatch, SetStateAction, useState } from 'react';
import { updateTaskService } from '../../services/taskService';
import { useAppDispatch } from '../../store/hooks';
import { updateTask } from '../../store/reducers/tasksSlice';
import { SubTask, Task } from '../../Types';
import { convertStringToDate, differenceSeconds } from '../../utils/dateHelpers';
import Button, { BUTTON_TYPE } from '../button/Button';
import { SubTaskComp } from '../subtask/Subtask';
import { TaskDetailsContainer } from './Task.style';

type TaskDetailsProps = {
    activeTask: Task;
    setOpenDetails: Dispatch<SetStateAction<boolean>>;
};

export const TaskDetails = ({ activeTask, setOpenDetails }: TaskDetailsProps) => {
    const dispatch = useAppDispatch();
    const subtasks = [...activeTask.subTasks];
    const [completedSubtasks, setCompletedSubtasks] = useState<SubTask[]>(subtasks);
    console.log(activeTask);
    return (
        <TaskDetailsContainer>
            {activeTask.subTasks.map((subTask) => (
                <SubTaskComp
                    subTask={subTask}
                    key={subTask.id}
                    getDurationForSubtasks={getDurationForSubtasks}
                    taskStatus={activeTask.status}
                    handleCompletedSubtasks={handleCompletedSubtasks}
                />
            ))}
            <Button btnType={BUTTON_TYPE.primary} onClick={handleCompleteTask}>
                Completed
            </Button>
        </TaskDetailsContainer>
    );

    function handleCompleteTask() {
        const updatedTask = { ...activeTask, subTasks: completedSubtasks };
        updateTaskService(updatedTask).then((newTask) => {
            dispatch(updateTask(newTask));
            setOpenDetails(false);
        });
    }

    function handleCompletedSubtasks(id: string, completed: boolean) {
        const getStatus = completed ? 'COMPLETED' : 'NOT_COMPLETED';
        setCompletedSubtasks((prev) => {
            return prev.map((subtask) => {
                if (subtask.id === id) {
                    return { ...subtask, status: getStatus };
                } else {
                    return subtask;
                }
            });
        });
    }

    function getDurationForSubtasks() {
        const indexLastEl = activeTask.subTasks.length - 1;
        const firstSubtaskDate = convertStringToDate(activeTask.subTasks[0].date!);
        const lastSubtaskDate = convertStringToDate(activeTask.subTasks[indexLastEl].date!);
        const totalTimeDifference = differenceSeconds(
            {
                earlierDate: firstSubtaskDate,
                earlierTime: activeTask.subTasks[0].start!,
            },
            {
                laterDate: lastSubtaskDate,
                laterTime: activeTask.subTasks[indexLastEl].end!,
            }
        );
        return totalTimeDifference;
    }
};
