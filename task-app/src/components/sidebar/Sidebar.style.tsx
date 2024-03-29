import styled from 'styled-components';

interface SidebarProps {
    readonly isActive: boolean;
}

export const SidebarContainer = styled.div<SidebarProps>`
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    height: 100%;
    width: ${(props) => props.isActive && '40%'};
    transition: width linear 0.5s;
    backdrop-filter: blur(16px) saturate(180%);
    background-color: rgb(255 255 255 / 63%);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-y: auto;
    @media (max-width: ${(props) => props.theme.deviceSize.xs}) {
        width: ${(props) => props.isActive && '50%'};
    }
`;
