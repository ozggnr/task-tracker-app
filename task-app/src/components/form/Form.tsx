import { PropsWithChildren } from 'react';

type Props = {
    children?: React.ReactNode;
    onSubmit: React.FormEventHandler;
};

export const Form = ({ children, onSubmit }: PropsWithChildren<Props>) => {
    return <form onSubmit={onSubmit}>{children}</form>;
};
