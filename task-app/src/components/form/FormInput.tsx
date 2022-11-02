import { InputHTMLAttributes, FC } from "react";

type FormInputProps = { label?: string } & InputHTMLAttributes<HTMLInputElement>

export const FormInput = ({label, ...rest}: FormInputProps) => {
    console.log({...rest})
    return <div>
        {label ? <label>{label}</label> : ''}
        <input {...rest} />
    </div>
}
