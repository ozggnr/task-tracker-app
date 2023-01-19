import { PropsWithChildren, useEffect, useState } from 'react';
import { SubTask, Task } from '../../Types';
import { useTaskStatus } from '../../utils/useTaskStatus';
import { Checkbox } from '../button/Checkbox';
import { FormInput } from '../form/FormInput';

type TaskDetailsProps = {
    subtask: SubTask;
    openDetails: boolean;
};

export const TaskDetails = ({ subtask, openDetails }: TaskDetailsProps) => {
    const [subActiveTask, setSubActiveTask] = useState(subtask);

    return (
        <div>
            <FormInput
                type="checkbox"
                name="subtask"
                value={subActiveTask.id}
                id={subActiveTask.id}
                key={subActiveTask.id}
                label={subActiveTask.description}
                onChange={handleCompleteTask}
            />
        </div>
    );

    function handleCompleteTask() {
        console.log(subActiveTask);
        // setCompleted(!completed);
    }
};
