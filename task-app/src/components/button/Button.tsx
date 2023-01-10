import { ReactNode, ButtonHTMLAttributes, MouseEventHandler } from 'react';
import {
    ButtonCancel,
    ButtonSave,
    ButtonDelete,
    BaseButton,
    ButtonEdit,
} from './Button.style';
import { AddIcon, getIcon, ICON_SIZE, ICON_TYPE } from './Icon.style';

//to create button types
export enum BUTTON_TYPE {
    button = 'button',
    save = 'save',
    delete = 'delete',
    cancel = 'cancel',
    edit = 'edit',
}
const getButton = (buttonType = BUTTON_TYPE.button) => {
    const selectedButton = {
        [BUTTON_TYPE.button]: BaseButton,
        [BUTTON_TYPE.save]: ButtonSave,
        [BUTTON_TYPE.delete]: ButtonDelete,
        [BUTTON_TYPE.cancel]: ButtonCancel,
        [BUTTON_TYPE.edit]: ButtonEdit,
    }[buttonType];
    // console.log(selectedButton);
    return selectedButton;
};

type ButtonProps = {
    props?: ButtonHTMLAttributes<HTMLButtonElement>;
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    icon?: ICON_TYPE;
    iconSize?: ICON_SIZE;
    type?: BUTTON_TYPE;
};
export default function Button({
    props,
    icon,
    iconSize,
    type,
    onClick,
    children,
}: ButtonProps) {
    // console.log(icon, children);
    const Button = getButton(type);
    const Icon = getIcon(icon!);
    // console.log(iconSize, icon);
    return (
        <Button {...props} onClick={onClick}>
            {icon && <Icon size={iconSize!} />}
            {children}
        </Button>
    );
}
