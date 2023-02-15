import styled from 'styled-components';

interface InputProps {
    readonly isAlert: boolean;
}

export const FormContent = styled.div`
    height: 100%;
    overflow-y: auto;
    flex: 1 1 1px;
`;
export const FormInputStyle = styled.div<InputProps>`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    color: ${(props) => props.isAlert && 'red'};
`;

export const TimeInputContainer = styled.div`
    display: flex;
    column-gap: 1rem;
    & > div {
        flex-grow: 1;
    }
`;
