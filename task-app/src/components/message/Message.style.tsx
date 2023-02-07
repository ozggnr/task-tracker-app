import styled from 'styled-components';
import { ButtonDays } from '../button/Button.style';

export const MessageContainer = styled.span`
    font-size: 0.75rem;
    position: absolute;
    font-weight: 400;
    top: 0px;
    display: none;
    border: 2px solid #ffa726;
    background-color: #ffe0b2;
    border-radius: 0.5rem;
    color: #fb8c00;
    height: 2rem;
    ${ButtonDays}:hover & {
        display: flex;
        align-items: center;
    }
`;
