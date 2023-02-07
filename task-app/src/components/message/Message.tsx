import { getIcon, ICON_TYPE } from '../button/Icon.style';
import { MessageContainer } from './Message.style';

type MessageProps = {
    message: string;
    severity: SEVERITY_TYPE;
    withIcon?: boolean;
};
export enum SEVERITY_TYPE {
    error = 'error',
    warning = 'warning',
    success = 'success',
}

// TODO change this like I did with button comp
export const Message = ({ message, severity, withIcon }: MessageProps) => {
    const icon = ICON_TYPE[severity as keyof typeof ICON_TYPE];
    const Icon = getIcon(ICON_TYPE[icon]!);
    return (
        <MessageContainer>
            {withIcon && <Icon />}
            {message}
        </MessageContainer>
    );
};
