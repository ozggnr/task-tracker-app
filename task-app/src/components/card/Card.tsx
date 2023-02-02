import { PropsWithChildren } from 'react';
import { CardComponent } from './Card.style';

type CardProps = {
    cardActive: boolean;
};

export default function Card({ children, cardActive }: PropsWithChildren<CardProps>) {
    return <CardComponent isActive={cardActive}>{children}</CardComponent>;
}
