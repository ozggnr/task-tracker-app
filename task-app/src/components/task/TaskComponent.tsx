import { PropsWithChildren } from 'react';
import { Task } from '../../Types';
import { ProgressBar } from '../progressBar/ProgressBar';

type TaskProps = {
    task: Task;
};
export const TaskComponent = ({ task }: PropsWithChildren<TaskProps>) => {
    return (
        <div className="taskContainer">
            <ProgressBar />
            <div className="task">
                <div className="col-1">{task.start}</div>
                <div className="col-1">
                    <div className="task-title">{task.title}</div>
                    <div className="task-desc">{task.description}</div>
                </div>
            </div>
        </div>
    );
};
