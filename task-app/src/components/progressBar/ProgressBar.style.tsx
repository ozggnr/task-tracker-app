import styled from 'styled-components';
import { isCompleted, isInProgress, isNotCompleted } from '../../utils/taskHelpers';

interface ProgressBarProps {
    readonly height?: number;
    readonly status?: string;
}
export const ProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 600;
    height: 100%;
`;
export const ProgressBarContainer = styled.div<ProgressBarProps>`
    background-color: ${(props) =>
        isCompleted(props.status!)
            ? `${props.theme.statusColors.completed.bg}`
            : isNotCompleted(props.status!)
            ? `${props.theme.statusColors.notCompleted.bg}`
            : isInProgress(props.status!)
            ? `${props.theme.statusColors.inProgress.bg}`
            : '#8080806b'};
    width: 0.5rem;
    height: 100%;
    margin: 0.5rem;
    border-radius: 0.5rem;
`;
export const ProgressTime = styled.div`
    width: max-content;
`;
