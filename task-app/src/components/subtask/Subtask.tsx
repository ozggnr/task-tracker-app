import { differenceSeconds } from '../../utils/dateHelpers';
import { SubTask } from '../../Types';
import { FormInput } from '../form/FormInput';
import { SubtaksContainer, SubtaskDesc, SubtaskProgressBarContainer } from './SubTask.style';
import { ProgressBar } from '../progressBar/ProgressBar';
import { ChangeEvent, useState } from 'react';
import { isCompleted } from '../../utils/taskHelpers';

type SubtaskProps = {
    subTask: SubTask;
    getDurationForSubtasks: () => number;
    taskStatus?: string;
    handleCompletedSubtasks: (id: string, completed: boolean) => void;
};
export const SubTaskComp = ({ subTask, getDurationForSubtasks, taskStatus, handleCompletedSubtasks }: SubtaskProps) => {
    const [isChecked, setIsChecked] = useState(isCompleted(subTask.status!));
    const subdiff = differenceSeconds(
        { earlierDate: new Date(), earlierTime: subTask.start! },
        { laterDate: new Date(), laterTime: subTask.end! }
    );
    const totalSubtaskSec = getDurationForSubtasks();
    const height = Math.floor((subdiff * 100) / totalSubtaskSec);

    return (
        <SubtaksContainer height={height}>
            <ProgressBar startTime={subTask.start!} endTime={subTask.end!} status={taskStatus} />
            <SubtaskDesc>
                <FormInput
                    type="checkbox"
                    name="subTask"
                    value={subTask.status}
                    key={subTask.id}
                    label={subTask.description}
                    labelPosition="left"
                    onChange={handleChangeSubtask}
                    checked={isChecked}
                />
            </SubtaskDesc>
        </SubtaksContainer>
    );
    function handleChangeSubtask(ev: ChangeEvent<HTMLInputElement>) {
        setIsChecked(ev.target.checked);
        handleCompletedSubtasks(subTask.id!, ev.target.checked);
        // setCompletedSubtasks(prev =>  ([...prev, { id: subTask.id, completed: ev.target.checked }]));
    }
};
