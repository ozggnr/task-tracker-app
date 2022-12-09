import styled from 'styled-components';

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: #b9bbbf99;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalBox = styled.div`
    background-color: #fcfaf2;
    width: 50%;
    height: 30%;
    border-radius: 0.5rem;
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CloseButton = styled.div`
    margin: 0.2rem 0 0 0.4rem;
`;
