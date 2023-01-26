import { useState } from 'react';
import { InputHTMLAttributes } from 'react';
import { Checkbox } from '../button/Checkbox';
import { FormInputStyle } from './Form.style';

type FormInputProps = {
    label?: string;
    error?: boolean;
    alert?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({ label, error, type, alert, ...rest }: FormInputProps) => {
    return (
        <>
            {type === 'checkbox' ? (
                <Checkbox label={label} {...rest} />
            ) : (
                <FormInputStyle>
                    {label ? <label>{label}</label> : ''}
                    <input type={type} {...rest} />
                </FormInputStyle>
            )}
            {/* <ErrorMessage> */}
            <div>{alert}</div>

            {/* </ErrorMessage> */}
        </>
    );
};

export function checkEmptyField(value: string) {
    return !value.length;
}
