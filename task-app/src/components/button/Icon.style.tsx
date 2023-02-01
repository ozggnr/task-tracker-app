import styled from 'styled-components';
import { Plus, CircleXmark, CaretLeft, CaretRight, TrashCan, PenToSquare } from '@styled-icons/fa-solid';

export enum ICON_TYPE {
    add = 'add',
    edit = 'edit',
    delete = 'delete',
}
export enum ICON_SIZE {
    small = '1rem',
    medium = '2rem',
    large = '3rem',
}

export const getIcon = (iconType: ICON_TYPE) => {
    const icon = {
        [ICON_TYPE.add]: AddIcon,
        [ICON_TYPE.edit]: EditIcon,
        [ICON_TYPE.delete]: DeleteIcon,
    }[iconType];
    return icon;
};
export const AddIcon = styled(Plus)`
    color: #fcfaf2;
    width: ${(props) => props.size || ICON_SIZE.small};
`;

export const CloseIcon = styled(CircleXmark)`
    color: tomato;
    width: ${(props) => props.size || ICON_SIZE.small};
`;

export const LeftIcon = styled(CaretLeft)`
    width: 0.5rem;
`;

export const RightIcon = styled(CaretRight)`
    width: 0.5rem;
`;

export const DeleteIcon = styled(TrashCan)`
    width: ${(props) => props.size || ICON_SIZE.small};
    color: #ee6060;
`;

export const EditIcon = styled(PenToSquare)`
    width: ${(props) => props.size || ICON_SIZE.small};
    color: #362e54;
`;
