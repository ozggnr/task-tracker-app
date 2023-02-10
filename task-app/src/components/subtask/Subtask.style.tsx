import styled from 'styled-components';

interface SubtaskStyleProps {
    height?: number;
}

export const SubtaksContainer = styled.div<SubtaskStyleProps>`
    display: flex;
    height: ${(props) => props.height + '%'};
    column-gap: 2rem;
`;

export const SubtaskTime = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const SubtaskDesc = styled.div``;
