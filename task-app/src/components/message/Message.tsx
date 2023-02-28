import { getIcon, ICON_SIZE, ICON_TYPE } from '../button/Icon.style';
import {
    ErrorMessage,
    MessageText,
    SuccessMessage,
    ValidationErrorMessage,
    WarningMessage,
    InfoMessage,
} from './Message.style';

export enum SEVERITY_TYPE {
    error = 'error',
    warning = 'warning',
    success = 'success',
    info = 'info',
    validationError = 'validationError',
}
type MessageProps = {
    message: string;
    severity: SEVERITY_TYPE;
    withIcon?: { icon: ICON_TYPE; size: ICON_SIZE };
    id?: string;
};

export const Message = ({ message, severity, withIcon, id }: MessageProps) => {
    const Icon = getIcon(ICON_TYPE[withIcon?.icon!]);
    const Message = getMessage(severity);

    return (
        <Message id={id}>
            {withIcon && <Icon size={withIcon?.size!} />}
            <MessageText>{message}</MessageText>
        </Message>
    );
};

const getMessage = (severity: SEVERITY_TYPE) => {
    const message = {
        [SEVERITY_TYPE.error]: ErrorMessage,
        [SEVERITY_TYPE.validationError]: ValidationErrorMessage,
        [SEVERITY_TYPE.warning]: WarningMessage,
        [SEVERITY_TYPE.success]: SuccessMessage,
        [SEVERITY_TYPE.info]: InfoMessage,
    }[severity];
    return message;
};
