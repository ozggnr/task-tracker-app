import styled from 'styled-components';

export const BaseButton = styled.button`
    width: 200px;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    background-color: #0b2361;
    color: white;
    text-transform: uppercase;
    font-weight: bolder;
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
