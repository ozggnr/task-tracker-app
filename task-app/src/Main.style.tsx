import styled from 'styled-components';

export const Divider = styled.hr`
    width: 90%;
    background: #362e5540;
    padding: 1px;
    margin: 2rem auto 0;
    border: none;
`;

// "$" is transient props. We use it since we just want to pass it to styled component and not to DOM or React Node
export const Row = styled.div`
    width: 100%;
    display: flex;
`;
