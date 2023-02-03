import styled from 'styled-components';
import { isCompleted, isInProgress, isNotCompleted } from '../../utils/validationHelpers';

interface CardProps {
    readonly isActive: boolean;
    readonly statusWarning?: string;
}
//TODO create variables for colors
export const CardComponent = styled.div<CardProps>`
    border-radius: 1rem;
    padding: 0.5rem;
    backdrop-filter: blur(16px) saturate(180%);
    border: ${(props) =>
        isCompleted(props.statusWarning!)
            ? '2px solid #0B9B8A'
            : isNotCompleted(props.statusWarning!)
            ? '2px solid #FF6673'
            : isInProgress(props.statusWarning!)
            ? '2px solid #8E65AB'
            : 'none'};
    background-color: rgb(255 255 255 / 63%);
    width: ${(props) => (props.isActive ? '60%' : '100%')};
    transition: width linear 0.25s;
    ${(props) =>
        props.isActive &&
        `
        transform: translateY(-5px);
        // box-shadow: 0px 10px 20px 2px #535bf238;
    `}
`;

export const CardHeader = styled.div``;

export const CardFooter = styled.div``;

export const CardBody = styled.div`
    display: flex;
    text-align: center;
    padding: 1rem;
`;
