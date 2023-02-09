import styled from 'styled-components';
import { isCompleted, isInProgress, isNotCompleted } from '../../utils/validationHelpers';

interface CardProps {
    readonly isActive: boolean;
    readonly statusWarning?: string;
}
//TODO create variables for colors
export const CardComponent = styled.div<CardProps>`
    height: 150px;
    border-radius: 1rem;
    padding: 0.5rem;
    backdrop-filter: blur(16px) saturate(180%);
    border: ${(props) =>
        isCompleted(props.statusWarning!)
            ? '2px solid #0B9B8A'
            : isNotCompleted(props.statusWarning!)
            ? '2px solid #ffa726'
            : isInProgress(props.statusWarning!)
            ? '2px solid #8E65AB'
            : 'none'};
    background-color: rgb(255 255 255 / 63%);
    width: ${(props) => (props.isActive ? '60%' : '100%')};
    transition: width linear 0.25s;
    ${(props) =>
        props.isActive &&
        `
        
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
