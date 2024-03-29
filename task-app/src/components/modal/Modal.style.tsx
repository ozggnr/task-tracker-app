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
//TODO - make modal component generic
interface ModalProps {
    readonly size: string;
}
export const ModalBox = styled.div<ModalProps>`
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(32px) saturate(180%);
    background-color: #ffffffde;
    width: ${(props) => (props.size === 'small' ? '40%' : '60%')};
    height: ${(props) => (props.size === 'small' ? '20%' : '60%')};
    border-radius: 0.5rem;
    padding: 0.5rem;
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: space-between;
`;
