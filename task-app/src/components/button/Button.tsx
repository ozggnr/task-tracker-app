import { ReactNode, ButtonHTMLAttributes, MouseEventHandler } from 'react';
import { Add, Close } from './Icon.style';

type ButtonProps = {
    props?: ButtonHTMLAttributes<HTMLButtonElement>;
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    icon?: string;
};
export default function Button({
    props,
    onClick,
    children,
    icon,
}: ButtonProps) {
    return (
        <button {...props} onClick={onClick}>
            {icon === 'add' && <Add />}
            {icon === 'close' && <Close />}
            {children}
        </button>
    );
}
