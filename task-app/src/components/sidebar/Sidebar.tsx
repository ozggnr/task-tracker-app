import { PropsWithChildren, MouseEventHandler } from 'react';
import { CloseIcon } from '../button/Icon.style';
import Portal from '../portal/Portal';
import { SidebarContainer } from './Sidebar.style';

type SidebarProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function Sidebar({
    children,
    onClick,
}: PropsWithChildren<SidebarProps>) {
    return (
        <Portal parentId="sidebar">
            <SidebarContainer>
                <CloseIcon onClick={() => onClick()} />
                {children}
            </SidebarContainer>
        </Portal>
    );
}
