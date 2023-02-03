import { PropsWithChildren } from 'react';
import { CardComponent } from './Card.style';

type CardProps = {
    cardActive: boolean;
    statusWarning?: string;
};

export default function Card({ children, cardActive, statusWarning }: PropsWithChildren<CardProps>) {
    return (
        <CardComponent isActive={cardActive} statusWarning={statusWarning}>
            {children}
        </CardComponent>
    );
}
