import styled from 'styled-components';

export const BaseButton = styled.button`
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5em;
    letter-spacing: 0.5px;
    background-color: #362e54;
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
    background-color: blue;
`;

export const ButtonDelete = styled(BaseButton)`
    background-color: #ee6060;
`;

export const ButtonCancel = styled(BaseButton)`
    background-color: green;
`;
export const ButtonEdit = styled(BaseButton)`
    background-color: #fff;
    color: #362e54;
    border: 1px solid #362e54;
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
