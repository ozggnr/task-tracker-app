import { ReactNode, ButtonHTMLAttributes, MouseEventHandler } from 'react';
import { ButtonDelete, BaseButton, SecondaryButton } from './Button.style';
import { AddIcon, getIcon, ICON_SIZE, ICON_TYPE } from './Icon.style';

//to create button types
export enum BUTTON_TYPE {
    button = 'button',
    submit = 'submit',
    delete = 'delete',
    secondary = 'secondary',
}
const getButton = (buttonType = BUTTON_TYPE.button) => {
    const selectedButton = {
        [BUTTON_TYPE.button]: BaseButton,
        [BUTTON_TYPE.submit]: BaseButton,
        [BUTTON_TYPE.delete]: ButtonDelete,
        [BUTTON_TYPE.secondary]: SecondaryButton,
    }[buttonType];
    return selectedButton;
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    icon?: ICON_TYPE;
    iconSize?: ICON_SIZE;
    btnType?: BUTTON_TYPE;
}

export default function Button(props: ButtonProps) {
    const { children, icon, iconSize, btnType, ...rest } = props;
    const Button = getButton(btnType);
    const Icon = getIcon(icon!);

    return (
        <Button {...rest}>
            {icon && (
                <span>
                    <Icon size={iconSize!} />
                </span>
            )}
            {children}
        </Button>
    );
}
