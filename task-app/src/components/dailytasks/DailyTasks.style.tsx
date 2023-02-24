import styled from 'styled-components';
import { Row } from '../../Main.style';

export const DayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 6rem 1rem 6rem;
    overflow-y: auto;
    row-gap: 2rem;
`;
export const AddTaskButtonRow = styled(Row)`
    justify-content: flex-end;
    padding: 1rem 6rem 1rem 0;
`;
