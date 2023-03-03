import styled from 'styled-components';

interface CheckboxContainerProps {
    readonly label: 'right' | 'left';
}
export const CheckboxContainer = styled.div<CheckboxContainerProps>`
    display: flex;
    align-items: center;
    column-gap: 0.25rem;
    ${(props) =>
        props.label === 'left' &&
        `
            justify-content: space-between;
            width: 100%;
        `}
`;
