import { PropsWithChildren } from 'react';
import { SForm } from './Form.style';

type Props = {
    children?: React.ReactNode;
    onSubmit: React.FormEventHandler;
};

export const Form = ({ children, onSubmit }: PropsWithChildren<Props>) => {
    return <SForm onSubmit={onSubmit}>{children}</SForm>;
};
