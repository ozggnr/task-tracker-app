import { InputHTMLAttributes } from 'react';
import { StyledCheckbox } from '../form/Form.style';
import { CheckboxContainer } from './Checkbox.style';

type CheckboxProps = {
    label?: string;
    labelPosition?: 'left' | 'right';
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = (props: CheckboxProps) => {
    const { label, checked, labelPosition = 'right', ...rest } = props;

    return (
        <CheckboxContainer label={labelPosition}>
            {labelPosition === 'left' && <label>{label}</label>}
            <StyledCheckbox checked={checked} />
            {labelPosition === 'right' && <label>{label}</label>}
        </CheckboxContainer>
    );
};
