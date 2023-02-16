import styled from 'styled-components';

interface TaskContainerProps {
    readonly overdue?: boolean;
    readonly cardActive?: boolean;
}
export const TaskContainer = styled.div<TaskContainerProps>`
    display: flex;
    column-gap: 3rem;
    width: 80%;
    ${(props) => props.overdue && 'opacity: 0.6'};
    padding-top: 0.5rem;
`;

export const TaskDetailsContainer = styled.div`
    height: 100%;
    padding: 4rem 2rem 4rem 2rem;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;

export const TaskTimeBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
`;
export const TaskTitle = styled.h5`
    text-transform: uppercase;
    // padding: 0.5rem 0;
`;
export const TaskDescription = styled.p`
    padding: 0.5rem 0 0 0.5rem;
`;
export const TaskInfo = styled.div`
    font-size: 0.75rem;
    color: #9e9e9e;
    padding: 0.25rem 0 0 0.25rem;
`;
