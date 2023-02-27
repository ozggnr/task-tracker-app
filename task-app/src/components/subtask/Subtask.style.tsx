import styled from 'styled-components';
import { ProgressContainer } from '../progressBar/ProgressBar.style';

interface SubtaskStyleProps {
    height?: number;
}

export const SubtaksContainer = styled.div<SubtaskStyleProps>`
    display: flex;
    height: ${(props) => props.height + '%'};
    column-gap: 2rem;
`;
export const SubtaskProgressBarContainer = styled(ProgressContainer)`
    width: 20%;
    height: 100%;
`;
export const SubtaskDesc = styled.div`
    width: 100%;
`;
