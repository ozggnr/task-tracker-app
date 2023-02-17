import { getIcon, ICON_TYPE } from '../button/Icon.style';
import { ErrorMessage, MessageText, SuccessMessage, WarningMessage } from './Message.style';

export enum SEVERITY_TYPE {
    error = 'error',
    warning = 'warning',
    success = 'success',
}
type MessageProps = {
    message: string;
    severity: SEVERITY_TYPE;
    withIcon?: boolean;
};

export const Message = ({ message, severity, withIcon }: MessageProps) => {
    const icon = ICON_TYPE[severity as keyof typeof ICON_TYPE];
    const Icon = getIcon(ICON_TYPE[icon]!);
    const Message = getMessage(severity);
    console.log(Message);
    return (
        <Message>
            {withIcon && <Icon />}
            <MessageText>{message}</MessageText>
        </Message>
    );
};

const getMessage = (severity: SEVERITY_TYPE) => {
    const message = {
        [SEVERITY_TYPE.error]: ErrorMessage,
        [SEVERITY_TYPE.warning]: WarningMessage,
        [SEVERITY_TYPE.success]: SuccessMessage,
    }[severity];
    return message;
};
