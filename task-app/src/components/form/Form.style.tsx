import styled from 'styled-components';

interface InputProps {
    readonly isAlert: boolean;
}

export const FormInputStyle = styled.div<InputProps>`
    display: flex;
    flex-direction: column;
    color: ${(props) => props.isAlert && 'red'};
`;
