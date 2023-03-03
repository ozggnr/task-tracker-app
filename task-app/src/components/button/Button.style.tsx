import styled from 'styled-components';

//button styling
export const BaseButton = styled.button`
    padding-inline: 1em;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.secondary};
    text-transform: uppercase;
    font-weight: 600;
    font-size: 100%;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    #tooltipId {
        display: none;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
    }
    &:hover #tooltipId {
        background-color: ${(props) => props.theme.colors.primary};
        color: ${(props) => props.theme.colors.secondary};
        padding: 0.25rem;
        margin-top: 0.2rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 400;
        white-space: nowrap;
        z-index: 1;
        display: block;
        font-size: ;
    }
    :disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const SecondaryButton = styled(BaseButton)`
    padding-inline: 0.5em;
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
`;
export const LinkButton = styled(BaseButton)`
    background: none;
    color: ${(props) => props.theme.colors.primary};
`;

export const ButtonDelete = styled(BaseButton)`
    padding-inline: 0.5em;
    color: ${(props) => props.theme.colors.danger};
    background-color: #fff;
    border: 1px solid ${(props) => props.theme.colors.danger};
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
    border-radius: 100px 50% / 20px 30px;
    line-height: 2em;
    font-weight: 700;
    font-size: 100%;
    padding-inline: 0.75rem;
    background-color: ${(props) =>
        props.taskCompleted === null ? '#8080807a' : props.taskCompleted ? '#0B9B8Ab5' : '#ffa726b5'};
    background-image: linear-gradient(45deg, rgb(255 255 255 / 20%) 50%, transparent 50%);
    background: ${(props) => !props.isDayBefore && 'none'};
    ${(props) => props.isActive && `transform: scale(1.1)`};
    color: ${(props) => props.theme.colors.primary};
    border: ${(props) => (props.isActive ? `2px solid ${props.theme.colors.primary}` : 'none')};
    &:hover {
        border: 2px solid ${(props) => props.theme.colors.primary};
        background-image: none;
    }
`;
