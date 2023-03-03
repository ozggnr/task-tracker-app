import styled from 'styled-components';
import { Row } from '../../Main.style';
import { isInProgress } from '../../utils/taskHelpers';

interface CardProps {
    readonly isActive: boolean;
    readonly statusWarning?: string;
}

export const CardComponent = styled.div<CardProps>`
    height: 100%;
    border-radius: 1rem;
    padding: 0.75rem;
    background-color: rgb(255 255 255 / 63%);
    transition: width linear 0.25s;
    border: ${(props) =>
        isInProgress(props.statusWarning!) ? `2px solid ${props.theme.statusColors.inProgress.badge}` : 'none'};
    width: ${(props) => (props.isActive ? '50%' : '100%')};
`;

export const CardHeader = styled(Row)``;

export const CardBody = styled(Row)`
    flex-direction: column;
    padding: 0.5rem;
`;
export const CardFooter = styled(Row)`
    justify-content: flex-end;
`;
export const CardButtonGroup = styled(Row)`
    padding: 0 0 0.5rem 0;
    column-gap: 0.25rem;
    justify-content: flex-end;
`;
