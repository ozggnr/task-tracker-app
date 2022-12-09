import styled from 'styled-components';
import {
    Plus,
    CircleXmark,
    CaretLeft,
    CaretRight,
    TrashCan,
    PenToSquare,
} from '@styled-icons/fa-solid';

export const AddIcon = styled(Plus)`
    color: #fcfaf2;
    width: 1rem;
`;

export const CloseIcon = styled(CircleXmark)`
    width: ${(props) =>
        props.size === 'medium'
            ? '2rem'
            : props.size === 'large'
            ? '3rem'
            : '1rem'};

    color: tomato;
`;

export const LeftIcon = styled(CaretLeft)`
    width: 0.5rem;
`;

export const RightIcon = styled(CaretRight)`
    width: 0.5rem;
`;

export const DeleteIcon = styled(TrashCan)`
    width: 1rem;
    color: tomato;
`;

export const EditIcon = styled(PenToSquare)`
    width: 1rem;
    color: tomato;
`;
