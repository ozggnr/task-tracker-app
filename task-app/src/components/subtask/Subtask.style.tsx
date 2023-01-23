import styled from 'styled-components';

interface SubtaskStyleProps {
    height: number;
}
interface SubtaskProgressBarProps {
    index: number;
}
const randomBarColors = ['#A3AEDC', '#8CDEC0', '#FFBC8F', '#FF8880']; //TODO make this random as it depends on the length of subtasks

export const SubtaksContainer = styled.div<SubtaskStyleProps>`
    display: flex;
    height: ${(props) => props.height + '%'};
    column-gap: 2rem;
`;

export const SubtaskProgressBar = styled.div<SubtaskProgressBarProps>`
    background-color: ${(props) => randomBarColors[props.index]};
    width: 1rem;
    height: 100%;
    margin: 0.5rem;
`;

export const SubtaskTime = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
