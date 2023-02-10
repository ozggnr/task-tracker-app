import styled from 'styled-components';

interface ProgressBarProps {
    height: number;
}
export const ProgressBarContainer = styled.div`
    background-color: cornsilk;
    width: 1rem;
    height: 100%;
    margin: 0.5rem;
    border: 2px solid #a3aedc;
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
