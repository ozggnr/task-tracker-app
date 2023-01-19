import { InputHTMLAttributes } from 'react';

type CheckboxProps = {
    label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = (props: CheckboxProps) => {
    const { name, value, label, id, checked, ...rest } = props;

    return (
        <div>
            <input
                type="checkbox"
                name={name}
                value={value}
                {...rest}
                checked={checked}
            />
            <label>{label}</label>
        </div>
    );
};
