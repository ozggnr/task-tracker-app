import { FC } from 'react';

type Props = {
    children?: React.ReactNode,
    handleSubmit: React.FormEventHandler
  };
  
export const Form: FC<Props> = ({children, handleSubmit}) => {
    console.log(children)
    console.log(handleSubmit)
    return <form onSubmit={handleSubmit}>
        {children}
    </form>
}