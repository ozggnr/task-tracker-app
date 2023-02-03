import { ReactNode, ButtonHTMLAttributes, MouseEventHandler } from 'react';
import { ButtonCancel, ButtonSave, ButtonDelete, BaseButton, ButtonEdit } from './Button.style';
import { AddIcon, getIcon, ICON_SIZE, ICON_TYPE } from './Icon.style';

//to create button types
export enum BUTTON_COLOR {
    button = 'button',
    save = 'save',
    delete = 'delete',
    cancel = 'cancel',
    edit = 'edit',
}
const getButton = (buttonType = BUTTON_COLOR.button) => {
    const selectedButton = {
        [BUTTON_COLOR.button]: BaseButton,
        [BUTTON_COLOR.save]: ButtonSave,
        [BUTTON_COLOR.delete]: ButtonDelete,
        [BUTTON_COLOR.cancel]: ButtonCancel,
        [BUTTON_COLOR.edit]: ButtonEdit,
    }[buttonType];
    return selectedButton;
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    icon?: ICON_TYPE;
    iconSize?: ICON_SIZE;
    color?: BUTTON_COLOR;
}

export default function Button(props: ButtonProps) {
    const { children, icon, iconSize, color, ...rest } = props;
    const Button = getButton(color);
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
