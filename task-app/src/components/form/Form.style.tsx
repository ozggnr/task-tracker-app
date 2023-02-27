import styled from 'styled-components';
import { Row } from '../../Main.style';

interface InputProps {
    readonly isAlert: boolean;
}
//TODO make this generic, find better way
interface FormProps {
    readonly grow?: string;
}
export const SForm = styled.form`
    display: flex;
    flex-direction: column;
    height: 100%;
`;
export const FormContent = styled.div`
    height: 100%;
    overflow-y: auto;
    flex: 1 1 1px;
    padding: 0 2rem;
    margin-bottom: 0.5rem;
`;
export const FormInputStyle = styled.div<FormProps>`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    ${(props) => props.grow && 'flex-grow:' + props.grow}
`;

export const FormInputRow = styled(Row)`
    column-gap: 0.5rem;
    align-items: flex-end;
`;
export const FormButtonRow = styled(Row)`
    justify-content: center;
    margin: 0.5rem 0;
`;
export const Input = styled.input<InputProps>`
    padding: 0rem 0.5rem;
    height: 2rem;
    ${(props) =>
        props.isAlert &&
        `
        border: 2px solid #e53935;
    `}
`;
export const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
    font: inherit;
    color: ${(props) => props.theme.colors.primary};
    width: 1.2rem;
    height: 1.2rem;
    border: 2px solid ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    display: grid;
    place-content: center;
    &:after {
        content: '';
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1rem 1rem ${(props) => props.theme.colors.primary};
    }
    &:checked:after {
        transform: scale(1);
    }
`;
