import { PropsWithChildren, MouseEventHandler } from 'react';
import { CloseIcon } from '../button/Icon.style';
import Portal from '../portal/Portal';
import { ModalContainer, ModalBox, ModalContent } from './Modal.style';

type ModalProps = {
    onClick?: MouseEventHandler;
    size: string;
};

export default function Modal({ children, onClick, size }: PropsWithChildren<ModalProps>) {
    return (
        <Portal parentId="modal">
            <ModalContainer>
                <ModalBox size={size}>
                    <CloseIcon onClick={onClick} />
                    <ModalContent>{children}</ModalContent>
                </ModalBox>
            </ModalContainer>
        </Portal>
    );
}
