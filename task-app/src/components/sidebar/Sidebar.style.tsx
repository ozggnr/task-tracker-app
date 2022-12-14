import styled from 'styled-components';

interface SidebarProps {
    readonly isActive: boolean;
}

export const SidebarContainer = styled.div<SidebarProps>`
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: ${(props) => (props.isActive ? '40%' : '0%')};
    transition: width linear 0.5s;
    backdrop-filter: blur(16px) saturate(180%);
    background-color: rgb(255 255 255 / 63%);
    padding: 15px;
`;
