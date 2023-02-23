import { InputHTMLAttributes } from 'react';
import { Checkbox } from '../button/Checkbox';
import { Message, SEVERITY_TYPE } from '../message/Message';
import { FormInputStyle, Input } from './Form.style';

type MessageType = {
    [key: string]: string[];
};
type FormInputProps = {
    label?: string;
    messages?: MessageType;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({ label, type, messages, name, ...rest }: FormInputProps) => {
    const errorExist = !!messages?.[name!]?.length!;

    return (
        <>
            {type === 'checkbox' ? (
                <Checkbox label={label} {...rest} />
            ) : (
                <FormInputStyle>
                    {label ? <label>{label}</label> : ''}
                    <Input type={type} name={name} isAlert={errorExist} {...rest} />
                    {messages?.[name!]?.length! > 0 &&
                        messages?.[name!].map((message) => (
                            <Message message={message} severity={SEVERITY_TYPE.validationError} />
                        ))}
                </FormInputStyle>
            )}
        </>
    );
};
