import styled from 'styled-components';
import { Row } from '../../Main.style';
import { isCompleted, isInProgress, isNotCompleted } from '../../utils/taskHelpers';

interface TaskContainerProps {
    readonly overdue?: boolean;
    readonly isActive?: boolean;
}
export const TaskContainer = styled.div<TaskContainerProps>`
    display: flex;
    column-gap: 3rem;
    width: 80%;
    justify-content: flex-start;
    ${(props) => props.overdue && 'opacity: 0.6'};
    padding-top: 0.5rem;
    @media (max-width: ${(props) => props.theme.deviceSize.s}}) {
        flex-direction: column;
        align-items: center;
    }
`;

export const TaskDetailsContainer = styled.div`
    height: 100%;
    width: 90%;
    margin: 0.5rem auto;
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
    width: 80%;
    overflow-wrap: break-word;
    @media (max-width: ${(props) => props.theme.deviceSize.xs}) {
        max-inline-size: 15em;
    }
    @media (min-width: ${(props) => props.theme.deviceSize.xs}) and (max-width: ${(props) =>
            props.theme.deviceSize.m}) {
        max-inline-size: 20em;
    }
`;
export const TaskInfo = styled.span`
    color: #9e9e9e;
`;

interface TaskStatusProps {
    readonly statusWarning?: string;
}
export const TaskStatusRow = styled(Row)<TaskStatusProps>`
    align-items: flex-start;
    width: 100%;
`;
export const TaskStatus = styled.h5<TaskStatusProps>`
    padding: 0.2rem;
    border-radius: 357px 1200% / 30px 20px;
    background-color: ${(props) =>
        isCompleted(props.statusWarning!)
            ? `${props.theme.statusColors.completed.badge}`
            : isNotCompleted(props.statusWarning!)
            ? `${props.theme.statusColors.notCompleted.badge}`
            : isInProgress(props.statusWarning!)
            ? `${props.theme.statusColors.inProgress.badge}`
            : '#9e9e9e'};

    color: ${(props) => props.theme.colors.secondary};
`;
