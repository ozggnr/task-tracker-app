import moment from 'moment';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Task } from '../../Types';

type TaskProps = {
    task: Task;
};
export const TaskComponent = ({ task }: PropsWithChildren<TaskProps>) => {
    return (
        <div className="task">
            <div className="col-1">{task.start}</div>
            <div className="col-1">
                <div className="task-title">{task.title}</div>
                <div className="task-desc">{task.desc}</div>
            </div>
        </div>
    );
};
