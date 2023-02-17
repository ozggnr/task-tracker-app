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
`;
export const ProgressBarContainer = styled.div<ProgressBarProps>`
    background-color: ${(props) =>
        isCompleted(props.status!)
            ? '#0B9B8A6b'
            : isNotCompleted(props.status!)
            ? '#ffa7266b'
            : isInProgress(props.status!)
            ? '#a3aedc6b'
            : '#8080806b'};
    width: 0.5rem;
    height: 100%;
    margin: 0.5rem;
    border-radius: 0.5rem;
`;

export const ProgressBarBack = styled.div<ProgressBarProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: ${(props) => props.height + '%'};
    background-color: #fff;
    border: 2px solid rgb(20, 116, 20);
`;
