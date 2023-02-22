import styled from 'styled-components';
import { isCompleted, isInProgress, isNotCompleted } from '../../utils/taskHelpers';

interface CardProps {
    readonly isActive: boolean;
    readonly statusWarning?: string;
}
//TODO create variables for colors
export const CardComponent = styled.div<CardProps>`
    height: 150px;
    border-radius: 1rem;
    padding: 0.5rem;
    ${(props) => props.isActive && 'transform: scale(1.1)'};

    border: ${(props) =>
        isCompleted(props.statusWarning!)
            ? `2px solid ${props.theme.statusColors.completed.border}`
            : isNotCompleted(props.statusWarning!)
            ? `2px solid ${props.theme.statusColors.notCompleted.border}`
            : isInProgress(props.statusWarning!)
            ? `2px solid ${props.theme.statusColors.inProgress.border}`
            : 'none'};

    background-color: rgb(255 255 255 / 63%);
    width: ${(props) => (props.isActive ? '60%' : '100%')};
    transition: width linear 0.25s;
    ${(props) =>
        (props.isActive || isInProgress(props.statusWarning!)) &&
        `
        box-shadow: 0 25px 50px #a3aedcc7;
    `}
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    height: 25%;
`;

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    height: 50%;
    padding: 0.5rem;
`;
export const CardFooter = styled.div`
    height: 25%;
`;

// background-color: ${(props) =>
//     isCompleted(props.statusWarning!)
//         ? '#0b9b8a52'
//         : isNotCompleted(props.statusWarning!)
//         ? '#ffa72652'
//         : isInProgress(props.statusWarning!)
//         ? '#8E65AB52'
//         : 'none'};
