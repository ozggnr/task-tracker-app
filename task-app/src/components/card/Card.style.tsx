import styled from 'styled-components';
import { isCompleted, isInProgress, isNotCompleted } from '../../utils/taskHelpers';

interface CardProps {
    readonly isActive: boolean;
    readonly statusWarning?: string;
}

export const CardComponent = styled.div<CardProps>`
    height: 150px;
    border-radius: 1rem;
    padding: 0.5rem;
    // ${(props) => props.isActive && 'transform: scale(1.1)'};

    border: ${(props) =>
        isInProgress(props.statusWarning!) ? `2px solid ${props.theme.statusColors.inProgress.border}` : 'none'};

    background-color: rgb(255 255 255 / 63%);
    width: ${(props) => (props.isActive ? '50%' : '100%')};
    transition: width linear 0.25s;
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
