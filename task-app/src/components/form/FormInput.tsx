import { useState } from 'react';
import { InputHTMLAttributes } from 'react';
import { Checkbox } from '../button/Checkbox';
import { FormInputStyle } from './Form.style';
import { SubTask } from '../../Types';
type FormInputProps = {
    label?: string;
    error?: boolean;
    message?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({ label, error, type, message, ...rest }: FormInputProps) => {
    return (
        <>
            {type === 'checkbox' ? (
                <Checkbox label={label} {...rest} />
            ) : (
                <FormInputStyle isAlert={!!message?.length}>
                    {label ? <label>{label}</label> : ''}
                    <input type={type} {...rest} />
                </FormInputStyle>
            )}
            {/* <ErrorMessage> */}
            <div>{message}</div>

            {/* </ErrorMessage> */}
        </>
    );
};
