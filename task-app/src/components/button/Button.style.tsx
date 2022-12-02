import styled from 'styled-components';

export const BaseButton = styled.button`
    width: 10rem;
    letter-spacing: 0.5px;
    padding: 0.5rem 0;
    background-color: #6096fd;
    color: #fcfaf2;
    text-transform: uppercase;
    font-weight: bolder;
    font-size: 1rem;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`;

export const ButtonSave = styled(BaseButton)`
    backgroundcolor: blue;
`;

export const ButtonDelete = styled(BaseButton)`
    backgroundcolor: red;
`;

export const ButtonCancel = styled(BaseButton)`
    backgroundcolor: green;
`;
// interface ButtonGroupProps {
//     readonly start?: boolean;
//     readonly center?: boolean;
//     readonly end?: boolean;
// }
export const ButtonGroup = styled.div`
    display: flex;
`;
// justify-content: ${(props) =>
//     props.start
//         ? 'flex-start'
//         : props.center
//         ? 'center'
//         : props.end
//         ? 'flex-end'
//         : ''};
