import { InputHTMLAttributes } from 'react';
import { Checkbox } from '../button/Checkbox';
import { FormInputStyle } from './Form.style';

type FormInputProps = {
    label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({ label, type, ...rest }: FormInputProps) => {
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
        </>
    );
};
