import { PropsWithChildren, MouseEventHandler } from 'react';
import { CloseIcon } from '../button/Icon.style';
import Portal from '../portal/Portal';
import { ModalContainer, ModalBox, ModalContent } from './Modal.style';

type ModalProps = {
    onClick?: MouseEventHandler;
};

export default function Modal({ children, onClick }: PropsWithChildren<ModalProps>) {
    return (
        <Portal parentId="modal">
            <ModalContainer>
                <ModalBox>
                    <CloseIcon onClick={onClick} />
                    <ModalContent>{children}</ModalContent>
                </ModalBox>
            </ModalContainer>
        </Portal>
    );
}
