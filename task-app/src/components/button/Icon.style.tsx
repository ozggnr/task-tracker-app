import styled from 'styled-components';
import { Add, Delete, ModeEdit, WarningAmber, Error, OpenInNew, ArrowLeft, ArrowRight } from '@styled-icons/material';
import { CircleXmark } from '@styled-icons/fa-solid';

export enum ICON_TYPE {
    add = 'add',
    open = 'open',
    edit = 'edit',
    delete = 'delete',
    warning = 'warning',
    error = 'error',
    left = 'left',
    right = 'right',
    // success = 'success'
}
export enum ICON_SIZE {
    small = '1em',
    medium = '1.5em',
    large = '2em',
}

export const getIcon = (iconType: ICON_TYPE) => {
    const icon = {
        [ICON_TYPE.add]: AddIcon,
        [ICON_TYPE.edit]: EditIcon,
        [ICON_TYPE.open]: OpenInNewIcon,
        [ICON_TYPE.delete]: DeleteIcon,
        [ICON_TYPE.warning]: WarningIcon,
        [ICON_TYPE.error]: ErrorIcon,
        [ICON_TYPE.left]: LeftIcon,
        [ICON_TYPE.right]: RightIcon,
    }[iconType];
    return icon;
};
export const AddIcon = styled(Add)`
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
export const OpenInNewIcon = styled(OpenInNew)`
    width: ${(props) => props.size || ICON_SIZE.small};
    color: ${(props) => props.theme.colors.primary};
`;
export const CloseIcon = styled(CircleXmark)`
    color: ${(props) => props.theme.colors.danger};
    width: ${(props) => props.size || ICON_SIZE.small};
`;

export const LeftIcon = styled(ArrowLeft)`
    width: ${(props) => props.size || ICON_SIZE.medium};
`;

export const RightIcon = styled(ArrowRight)`
    width: ${(props) => props.size || ICON_SIZE.medium};
`;
export const WarningIcon = styled(WarningAmber)`
    width: ${(props) => props.size || ICON_SIZE.small};
    color: ${(props) => props.theme.colors.warning};
`;
export const ErrorIcon = styled(Error)`
    width: ${(props) => props.size || ICON_SIZE.small};
    color: ${(props) => props.theme.colors.danger};
`;
