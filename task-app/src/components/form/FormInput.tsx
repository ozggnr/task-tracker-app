import { InputHTMLAttributes } from 'react';
import { FormInputStyle } from './Form.style';

type FormInputProps = {
    label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({ label, ...rest }: FormInputProps) => {
    return (
        <FormInputStyle>
            {label ? <label>{label}</label> : ''}
            <input {...rest} />
        </FormInputStyle>
    );
};
