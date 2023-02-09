import styled from 'styled-components';
import { isCompleted, isInProgress, isNotCompleted } from '../../utils/validationHelpers';

interface TaskContainerProps {
    readonly overdue?: boolean;
}
export const TaskContainer = styled.div<TaskContainerProps>`
    margin-top: 2rem;
    display: flex;
    column-gap: 2rem;
    width: 80%;
    ${(props) => props.overdue && 'opacity: 0.5'}
`;

export const TaskDetailsContainer = styled.div`
    height: 100%;
    padding: 4rem 2rem 4rem 2rem;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;

export const TaskTimeBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    width: 10%;
`;
export const TaskTitle = styled.h5`
    text-transform: uppercase;
    // padding: 0.5rem 0;
`;
export const TaskInfo = styled.div`
    font-size: 0.75rem;
    color: #9e9e9e;
`;
interface TimeBarProps {
    readonly status?: string;
}
export const TaskTimeBar = styled.div<TimeBarProps>`
    background-color: ${(props) =>
        isCompleted(props.status!)
            ? '#0B9B8A'
            : isNotCompleted(props.status!)
            ? '#ffa726'
            : isInProgress(props.status!)
            ? '#8E65AB'
            : 'red'};
    width: 0.25rem;
    height: 100%;
    margin: 0.5rem;
`;
