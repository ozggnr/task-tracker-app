import styled, { keyframes } from 'styled-components';

export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding-top: 4rem;
`;
const spinner = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
export const LoadingIcon = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 6px solid ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary} transparent ${(props) => props.theme.colors.primary}
        transparent;
    animation: ${spinner} 1s linear infinite;
`;

export const LoadingText = styled.h2`
    color: ${(props) => props.theme.colors.primary};
    padding: 1rem;
`;
