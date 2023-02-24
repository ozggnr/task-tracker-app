import styled from 'styled-components';
import { Row } from '../../Main.style';

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
    padding: 0 2rem;
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
export const FormInputRow = styled(Row)`
    column-gap: 0.5rem;
    align-items: flex-end;
`;
export const FormButtonRow = styled(Row)`
    justify-content: center;
    margin: 0.5rem 0;
`;
