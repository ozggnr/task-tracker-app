import styled from 'styled-components';

interface SubtaskStyleProps {
    height?: number;
}

export const SubtaksContainer = styled.div<SubtaskStyleProps>`
    display: flex;
    height: ${(props) => props.height + '%'};
    column-gap: 2rem;
`;

export const SubtaskDesc = styled.div``;
