import { ReactNode, ButtonHTMLAttributes, MouseEventHandler } from 'react';
import {
    ButtonCancel,
    ButtonSave,
    ButtonDelete,
    BaseButton,
} from './Button.style';

//to create button types
export enum BUTTON_TYPE {
    button = 'button',
    save = 'save',
    delete = 'delete',
    cancel = 'cancel',
}
const getButton = (buttonType = BUTTON_TYPE.button) => {
    const selectedButton = {
        [BUTTON_TYPE.button]: BaseButton,
        [BUTTON_TYPE.save]: ButtonSave,
        [BUTTON_TYPE.delete]: ButtonDelete,
        [BUTTON_TYPE.cancel]: ButtonCancel,
    }[buttonType];
    return selectedButton;
};
type ButtonProps = {
    props?: ButtonHTMLAttributes<HTMLButtonElement>;
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    icon?: string;
    type?: BUTTON_TYPE;
};
export default function Button({
    props,
    type,
    onClick,
    children,
    icon,
}: ButtonProps) {
    console.log(type);
    const Button = getButton(type);
    return (
        <Button {...props} onClick={onClick}>
            {children}
        </Button>
    );
}
