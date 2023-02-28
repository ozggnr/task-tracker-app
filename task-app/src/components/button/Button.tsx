import { ReactNode, ButtonHTMLAttributes, useState } from 'react';
import { Message, SEVERITY_TYPE } from '../message/Message';
import { ButtonDelete, BaseButton, SecondaryButton, LinkButton } from './Button.style';
import { AddIcon, getIcon, ICON_SIZE, ICON_TYPE } from './Icon.style';

//to create button types
export enum BUTTON_TYPE {
    primary = 'primary',
    secondary = 'secondary',
    delete = 'delete',
    link = 'link',
}
export const getButton = (buttonType = BUTTON_TYPE.primary) => {
    const selectedButton = {
        [BUTTON_TYPE.primary]: BaseButton,
        [BUTTON_TYPE.secondary]: SecondaryButton,
        [BUTTON_TYPE.delete]: ButtonDelete,
        [BUTTON_TYPE.link]: LinkButton,
    }[buttonType];
    return selectedButton;
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    icon?: ICON_TYPE;
    iconSize?: ICON_SIZE;
    btnType?: BUTTON_TYPE;
    tooltip?: string;
}
//TODO - maybe there is a better way to create button component to use for only icon, icon + text, text
export default function Button(props: ButtonProps) {
    const [isHovering, setIsHovering] = useState(false);
    const { children, icon, iconSize, btnType, tooltip, ...rest } = props;
    const CustomButton = getButton(btnType);
    const Icon = getIcon(icon!);
    const ariaDescribedBy = isHovering && tooltip ? 'tooltipId' : undefined;

    return (
        <>
            <CustomButton
                aria-describedby={ariaDescribedBy}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                {...rest}
            >
                {icon && (
                    <span>
                        <Icon size={iconSize!} />
                    </span>
                )}
                {children}
                {tooltip && <span id="tooltipId">{tooltip}</span>}
            </CustomButton>
        </>
    );
}
