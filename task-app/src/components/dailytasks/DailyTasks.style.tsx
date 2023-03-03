import styled from 'styled-components';

export const DayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem auto 1rem;
    width: 90%;
    overflow-y: auto;
    row-gap: 2rem;
    overflow-x: hidden;
    @media (max-width: ${(props) => props.theme.deviceSize.xs}) {
        row-gap: 1rem;
    }
`;
export const AddTaskButtonRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0.5rem 3rem 1rem;
    @media (max-width: ${(props) => props.theme.deviceSize.xs}) {
        padding: 0.5rem 1.5rem 1rem;
    }
`;
