import styled from 'styled-components';
import { Row } from '../../Main.style';

export const TaskFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 1rem;
`;
export const TaskFormHeader = styled(Row)`
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5em;
`;
export const SubtakInputContainer = styled.div`
    margin-top: 2rem;
`;
