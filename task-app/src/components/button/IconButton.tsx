import { ButtonHTMLAttributes, ReactNode } from 'react';
import { BUTTON_TYPE, getButton } from './Button';
import { ButtonIcon } from './Button.style';
import { getIcon, ICON_SIZE, ICON_TYPE } from './Icon.style';

type IconButtonProps = {
    icon: ICON_TYPE;
    iconSize?: ICON_SIZE;
    btnType: BUTTON_TYPE;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function IconButton(props: IconButtonProps) {
    const { children, icon, iconSize, btnType, ...rest } = props;
    const Icon = getIcon(icon!);

    return (
        <ButtonIcon {...rest}>
            <Icon size={iconSize!} />
        </ButtonIcon>
    );
}
