import styled from 'styled-components';
import { ButtonDays } from '../button/Button.style';

type MessageProps = {};
//Button messages
export const WarningMessage = styled.span<MessageProps>`
    font-size: 0.75rem;
    position: absolute;
    font-weight: 400;
    top: 0px;
    display: none;
    border: 2px solid #ffa726;
    background-color: #ffe0b2;
    border-radius: 0.5rem;
    color: ${(props) => props.theme.colors.warning};
    height: 2rem;
    ${ButtonDays}:hover & {
        display: flex;
        align-items: center;
    }
`;
export const SuccessMessage = styled.span<MessageProps>`
    font-size: 0.75rem;
    position: absolute;
    font-weight: 400;
    top: 0px;
    display: none;
    border: 2px solid #66bb6a;
    background-color: #c8e6c9;
    border-radius: 0.5rem;
    color: #${(props) => props.theme.colors.success};
    height: 2rem;
    ${ButtonDays}:hover & {
        display: flex;
        align-items: center;
    }
`;
//Form Error Message
//600 - #fb8c00, 400 - #ffa726, 100 - #ffe0b2
export const ErrorMessage = styled.span<MessageProps>`
    font-size: 0.75rem;
    font-weight: 400;
    color: ${(props) => props.theme.colors.danger};
`;

export const MessageText = styled.p``;
