import { differenceSeconds } from '../../utils/dateHelpers';
import { SubTask } from '../../Types';
import { FormInput } from '../form/FormInput';
import { SubtaksContainer, SubtaskDesc } from './SubTask.style';
import { ProgressBar } from '../progressBar/ProgressBar';

type SubtaskProps = {
    subTask: SubTask;
    getDurationForSubtasks: () => number;
    taskStatus?: string;
};
export const SubTaskComp = ({ subTask, getDurationForSubtasks, taskStatus }: SubtaskProps) => {
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
                    value={subTask.id}
                    id={subTask.id}
                    key={subTask.id}
                    label={subTask.description}
                    // onChange={handleCompleteTask}
                />
            </SubtaskDesc>
        </SubtaksContainer>
    );
};
