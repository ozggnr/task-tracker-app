import styled from 'styled-components';

export const Divider = styled.hr`
    width: 90%;
    background: #362e5540;
    padding: 1px;
    margin: 2rem auto 0;
    border: none;
`;

// "$" is transient props. We use it since we just want to pass it to styled component and not to DOM or React Node
interface RowProps {
    readonly width?: string;
    readonly $start?: boolean;
    readonly $center?: boolean;
    readonly $end?: boolean;
    readonly pt?: string;
    readonly pl?: string;
    readonly pr?: string;
    readonly pb?: string;
}
export const Row = styled.div<RowProps>`
    width: ${(props) => (props.width ? props.width + '%' : '100%')};
    display: flex;
    justify-content: ${(props) =>
        props.$start ? 'flex-start' : props.$center ? 'center' : props.$end ? 'flex-end' : ''};
    padding-top: ${(props) => props.pt && props.pt + 'rem'};
    padding-left: ${(props) => props.pl && props.pl + 'rem'};
    padding-right: ${(props) => props.pr && props.pr + 'rem'};
    padding-bottom: ${(props) => props.pb && props.pb + 'rem'};
    column-gap: 0.5rem;
`;
