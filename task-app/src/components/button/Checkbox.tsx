import { InputHTMLAttributes } from 'react';
import { CheckboxContainer } from './Checkbox.style';

type CheckboxProps = {
    label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = (props: CheckboxProps) => {
    const { name, value, label, id, checked, ...rest } = props;

    return (
        <CheckboxContainer>
            <input type="checkbox" name={name} value={value} {...rest} checked={checked} />
            <label>{label}</label>
        </CheckboxContainer>
    );
};
