import styled from 'styled-components';

interface InputProps {
    readonly isAlert: boolean;
}
//TODO make this generic, find better way
interface FormProps {
    readonly grow?: string;
}
export const FormContent = styled.div`
    height: 100%;
    overflow-y: auto;
    flex: 1 1 1px;
`;
export const FormInputStyle = styled.div<FormProps>`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    ${(props) => props.grow && 'flex-grow:' + props.grow}
`;
export const Input = styled.input<InputProps>`
    ${(props) =>
        props.isAlert &&
        `
        border: 2px solid #e53935;
    `}
`;
