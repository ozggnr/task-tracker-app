import styled from 'styled-components';
import { isCompleted, isInProgress, isNotCompleted } from '../../utils/taskHelpers';

interface TaskContainerProps {
    readonly overdue?: boolean;
}
export const TaskContainer = styled.div<TaskContainerProps>`
    display: flex;
    column-gap: 3rem;
    width: 80%;
    ${(props) => props.overdue && 'opacity: 0.6'};
    padding-top: 0.5rem;
`;

export const TaskDetailsContainer = styled.div`
    height: 100%;
    padding: 2rem 2rem 0 2rem;
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
`;
export const TaskTitle = styled.h5`
    text-transform: uppercase;
`;
export const TaskDescription = styled.p`
    padding: 0.5rem 0 0 0.5rem;
`;
export const TaskInfo = styled.span`
    font-size: 0.75rem;
    color: #9e9e9e;
`;

interface TaskStatusProps {
    readonly statusWarning?: string;
}
export const TaskStatus = styled.div<TaskStatusProps>`
    background-color: ${(props) =>
        isCompleted(props.statusWarning!)
            ? `${props.theme.statusColors.completed.badge}`
            : isNotCompleted(props.statusWarning!)
            ? `${props.theme.statusColors.notCompleted.badge}`
            : isInProgress(props.statusWarning!)
            ? `${props.theme.statusColors.inProgress.badge}`
            : 'none'};
    padding: 0 0.2rem;
    height: 75%;
    display: flex;
    align-items: center;
    border-radius: 357px 1200% / 30px 20px;
    color: ${(props) => props.theme.colors.secondary};
`;
