import { PropsWithChildren, MouseEventHandler } from 'react';
import { CloseIcon } from '../button/Icon.style';
import Portal from '../portal/Portal';
import { SidebarContainer } from './Sidebar.style';

type SidebarProps = {
    onClick?: MouseEventHandler;
    isActive: boolean;
};

export default function Sidebar({
    isActive,
    children,
    onClick,
}: PropsWithChildren<SidebarProps>) {
    return (
        <Portal parentId="sidebar">
            <SidebarContainer isActive={isActive}>
                <CloseIcon onClick={onClick} />
                {children}
            </SidebarContainer>
        </Portal>
    );
}
