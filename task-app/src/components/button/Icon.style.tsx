import styled from 'styled-components';
import { Add, Delete, ModeEdit, WarningAmber } from '@styled-icons/material';
import {
    Plus,
    CircleXmark,
    CaretLeft,
    CaretRight,
    TrashCan,
    PenToSquare,
    TriangleExclamation,
} from '@styled-icons/fa-solid';

export enum ICON_TYPE {
    add = 'add',
    edit = 'edit',
    delete = 'delete',
    warning = 'warning',
    // error = 'error',
    // success = 'success'
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
        [ICON_TYPE.warning]: WarningIcon,
    }[iconType];
    return icon;
};
export const AddIcon = styled(Add)`
    color: ${(props) => props.theme.colors.secondary};
    width: ${(props) => props.size || ICON_SIZE.small};
`;

export const DeleteIcon = styled(Delete)`
    width: ${(props) => props.size || ICON_SIZE.small};
    color: ${(props) => props.theme.colors.danger};
`;

export const EditIcon = styled(ModeEdit)`
    width: ${(props) => props.size || ICON_SIZE.small};
    color: ${(props) => props.theme.colors.primary};
`;
export const CloseIcon = styled(CircleXmark)`
    color: ${(props) => props.theme.colors.danger};
    width: ${(props) => props.size || ICON_SIZE.small};
`;

export const LeftIcon = styled(CaretLeft)`
    width: 0.5rem;
`;

export const RightIcon = styled(CaretRight)`
    width: 0.5rem;
`;
export const WarningIcon = styled(WarningAmber)`
    width: ${(props) => props.size || ICON_SIZE.small};
    color: ${(props) => props.theme.colors.warning};
`;
