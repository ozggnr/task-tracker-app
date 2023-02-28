import styled from 'styled-components';
import Button from '../button/Button';
import { BaseButton, ButtonDays, ButtonDelete } from '../button/Button.style';

//TODO refactor this page and use aria-describedby attr
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
    color: ${(props) => props.theme.colors.success};
    height: 2rem;
    ${ButtonDays}:hover & {
        display: flex;
        align-items: center;
    }
`;
export const InfoMessage = styled.span<MessageProps>`
    font-size: 0.75rem;
    position: absolute;
    font-weight: 400;
    top: 0px;
    display: none;
    border: 2px solid #66bb6a;
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 0.5rem;
    color: ${(props) => props.theme.colors.primary};
    height: 2rem;
`;

export const ErrorMessage = styled.h2`
    text-align: center;
    color: ${(props) => props.theme.colors.primary};
    padding-top: 4rem;
`;
//Form Error Message
export const ValidationErrorMessage = styled.span`
    font-size: 0.75rem;
    font-weight: 400;
    color: ${(props) => props.theme.colors.danger};
`;

export const MessageText = styled.p`
    padding: 0.5rem;
`;
