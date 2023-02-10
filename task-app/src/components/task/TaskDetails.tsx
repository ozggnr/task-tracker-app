import { Task } from '../../Types';
import { differenceSeconds } from '../../utils/dateHelpers';
import { SubTaskComp } from '../subtask/Subtask';
import { TaskDetailsContainer } from './Task.style';

type TaskDetailsProps = {
    activeTask: Task;
    openDetails: boolean;
};

export const TaskDetails = ({ activeTask }: TaskDetailsProps) => {
    // const [subActiveTask, setSubActiveTask] = useState(subtask);

    return (
        <TaskDetailsContainer>
            {activeTask.subTasks.map((subtask) => (
                <SubTaskComp subtask={subtask} key={subtask.id} getDurationForSubtasks={getDurationForSubtasks} />
            ))}
        </TaskDetailsContainer>
    );
    function handleCompleteTask() {
        // console.log(subActiveTask);
        // setCompleted(!completed);
    }

    function getDurationForSubtasks() {
        const indexLastEl = activeTask.subTasks.length - 1;
        const totalTimeDifference = differenceSeconds(
            { earlierDate: new Date(activeTask.subTasks[0].date!), earlierTime: activeTask.subTasks[0].start! },
            {
                laterDate: new Date(activeTask.subTasks[indexLastEl].date!),
                laterTime: activeTask.subTasks[indexLastEl].end!,
            }
        );
        return totalTimeDifference;
    }
};
