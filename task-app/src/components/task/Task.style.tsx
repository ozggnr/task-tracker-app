import styled from 'styled-components';

interface TaskContainerProps {
    readonly overdue?: boolean;
}
export const TaskContainer = styled.div<TaskContainerProps>`
    margin-top: 2rem;
    display: flex;
    column-gap: 2rem;
    width: 80%;
    ${(props) => props.overdue && 'opacity: 0.5'}
`;

export const TaskDetailsContainer = styled.div`
    height: 100%;
    padding: 4rem 2rem 4rem 2rem;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;
