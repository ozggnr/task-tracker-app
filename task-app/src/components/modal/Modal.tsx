import { PropsWithChildren, MouseEventHandler } from 'react';
import { CloseIcon } from '../button/Icon.style';
import Portal from '../portal/Portal';
import {
    ModalContainer,
    ModalBox,
    ModalContent,
    CloseButton,
} from './Modal.style';

type ModalProps = {
    onClick?: MouseEventHandler;
};

export default function Modal({
    children,
    onClick,
}: PropsWithChildren<ModalProps>) {
    return (
        <Portal parentId="modal">
            <ModalContainer>
                <ModalBox>
                    <CloseButton>
                        <CloseIcon onClick={onClick} />
                    </CloseButton>
                    <ModalContent>{children}</ModalContent>
                </ModalBox>
            </ModalContainer>
        </Portal>
    );
}
