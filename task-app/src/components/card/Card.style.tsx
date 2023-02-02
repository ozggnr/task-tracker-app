import styled, { keyframes } from 'styled-components';

interface CardProps {
    readonly isActive: boolean;
}
export const CardComponent = styled.div<CardProps>`
    border-radius: 1rem;
    padding: 0.5rem;
    // box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(16px) saturate(180%);
    background-color: rgb(255 255 255 / 63%);
    width: ${(props) => (props.isActive ? '60%' : '100%')};
    transition: width linear 0.25s;
    ${(props) =>
        props.isActive &&
        `
        transform: translateY(-5px);
        box-shadow: 0px 10px 20px 2px #535bf238;
        border: solid 2px #535bf2a6;
    `}
`;

export const CardHeader = styled.div`
    padding: 0.5rem;
`;

export const CardFooter = styled.div`
    padding: 0.5rem;
`;

export const CardBody = styled.div`
    display: flex;
    text-align: center;
    padding: 1rem;
`;
