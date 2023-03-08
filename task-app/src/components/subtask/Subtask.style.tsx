import styled from 'styled-components';
import { ProgressContainer } from '../progressBar/ProgressBar.style';

interface SubtaskStyleProps {
    height?: number;
    completed?: boolean;
}

export const SubtaksContainer = styled.div<SubtaskStyleProps>`
    display: flex;
    column-gap: 2rem;
    height: ${(props) => props.height + '%'};
    ${(props) => props.completed && 'opacity: 0.6'};
`;
export const SubtaskProgressBarContainer = styled(ProgressContainer)`
    width: 20%;
    height: 100%;
`;
export const SubtaskDesc = styled.div`
    width: 100%;
`;
