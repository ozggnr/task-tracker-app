import { Task } from '../../Types';

type TaskProps = {
    task: Task;
};

export const TaskDetails = ({ task }: TaskProps) => {
    return <div>Task details {task.start}</div>;
};
