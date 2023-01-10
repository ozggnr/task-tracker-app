import styled from 'styled-components';

interface RowProps {
    end?: boolean;
    start?: boolean;
    center?: boolean;
}
export const Row = styled.div<RowProps>`
    display: flex;
`;

//TODO create template
export const Title = styled.h1`
    color: #362e54;
`;

interface ContainerProps {
    readonly column?: boolean;
}
export const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: ${(props) => (props.column ? 'column' : 'row')};
`;
