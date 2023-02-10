import { differenceSeconds } from '../../utils/dateHelpers';
import { SubTask } from '../../Types';
import { FormInput } from '../form/FormInput';
import { SubtaksContainer, SubtaskDesc, SubtaskTime } from './Subtask.style';
import { ProgressBar } from '../progressBar/ProgressBar';

type SubtaskProps = {
    subtask: SubTask;
    getDurationForSubtasks: () => number;
};
export const SubTaskComp = ({ subtask, getDurationForSubtasks }: SubtaskProps) => {
    const subdiff = differenceSeconds(
        { earlierDate: new Date(), earlierTime: subtask.start! },
        { laterDate: new Date(), laterTime: subtask.end! }
    );
    const totalSubtaskSec = getDurationForSubtasks();
    const height = Math.floor((subdiff * 100) / totalSubtaskSec);

    return (
        <SubtaksContainer height={height}>
            <SubtaskTime>
                <div>{subtask.start}</div>
                <ProgressBar startTime={subtask.start!} endTime={subtask.end!} />
                <div>{subtask.end}</div>
            </SubtaskTime>
            <SubtaskDesc>
                <FormInput
                    type="checkbox"
                    name="subtask"
                    value={subtask.id}
                    id={subtask.id}
                    key={subtask.id}
                    label={subtask.description}
                    // onChange={handleCompleteTask}
                />
            </SubtaskDesc>
        </SubtaksContainer>
    );
};
