import styled from 'styled-components';

//button styling
export const BaseButton = styled.button`
    width: 120px;
    padding: 0.5rem 0.5rem;
    background-color: ${(props) => props.theme.colors.primary};
    // background-color: #262525;
    color: ${(props) => props.theme.colors.secondary};
    text-transform: uppercase;
    font-weight: bolder;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    :disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const SecondaryButton = styled(BaseButton)`
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
`;
export const LinkButton = styled(BaseButton)`
    background: none;
    color: #${(props) => props.theme.colors.primary};
`;

export const ButtonDelete = styled(BaseButton)`
    color: ${(props) => props.theme.colors.danger};
    background-color: #fff;
    border: 1px solid ${(props) => props.theme.colors.danger};
`;

export const ButtonCaret = styled(BaseButton)`
    width: 2rem;
    padding: 0.5rem 0;
`;

export const ButtonToday = styled(BaseButton)`
    width: 4rem;
    padding: 0;
    font-size: 0.75rem;
`;

export const ButtonIcon = styled.button`
    background: none;
    border: none;
`;
//it will help pass the props only to the buttondays and it will not pass to base button
interface ButtonDaysProps {
    readonly isActive: boolean;
    readonly taskCompleted?: boolean | null;
    readonly isDayBefore: boolean;
}

// border-radius --> before the slash we set horizontal radius, after the slash we set vertical radius
export const ButtonDays = styled.button<ButtonDaysProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) =>
        props.taskCompleted === null ? '#8080807a' : props.taskCompleted ? '#0B9B8Ab5' : '#ffa726b5'};
    background-image: linear-gradient(45deg, rgb(255 255 255 / 20%) 50%, transparent 50%);
    background: ${(props) => !props.isDayBefore && 'none'};
    border-radius: 100px 50% / 20px 30px;
    line-height: 2.5rem;
    font-weight: 700;
    padding: ${(props) => (props.isActive ? '2rem' : '1rem')};
    font-size: ${(props) => (props.isActive ? '1.25rem' : '1rem')};
    width: ${(props) => (props.isActive ? '6rem' : '5rem')};
    height: ${(props) => (props.isActive ? '7rem' : '6rem')};
    color: ${(props) => props.theme.colors.primary};
    border: ${(props) => (props.isActive ? `2px solid ${props.theme.colors.primary}` : 'none')};
    &:hover {
        border: 2px solid ${(props) => props.theme.colors.primary};
        background-image: none;
    }
`;
