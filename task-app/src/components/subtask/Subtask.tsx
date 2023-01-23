import { differenceSeconds } from '../../utils/dateHelpers';
import { SubTask } from '../../Types';
import { FormInput } from '../form/FormInput';
import { SubtaksContainer, SubtaskProgressBar, SubtaskTime } from './Subtask.style';

type SubtaskProps = {
    subtask: SubTask;
    getDurationForSubtasks: () => number;
    index: number;
};
export const SubTaskComp = ({ subtask, getDurationForSubtasks, index }: SubtaskProps) => {
    const subdiff = differenceSeconds(
        { earlierDate: new Date(), earlierTime: subtask.start! },
        { laterDate: new Date(), laterTime: subtask.end! }
    );
    const totalSecs = getDurationForSubtasks();
    const height = 100 / (totalSecs / subdiff);

    return (
        <SubtaksContainer height={height}>
            <SubtaskTime>
                <div>{subtask.start}</div>
                <SubtaskProgressBar index={index} />
                <div>{subtask.end}</div>
            </SubtaskTime>
            <FormInput
                type="checkbox"
                name="subtask"
                value={subtask.id}
                id={subtask.id}
                key={subtask.id}
                label={subtask.description}
                // onChange={handleCompleteTask}
            />
        </SubtaksContainer>
    );
};
