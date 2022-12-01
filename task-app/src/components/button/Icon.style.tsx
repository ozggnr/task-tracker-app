import styled from 'styled-components';
import { Plus, CircleXmark } from '@styled-icons/fa-solid';

export const Add = styled(Plus)`
    color: black;
    width: 10%;
    font-size: 400px;
    transition: all 200ms linear;
    /* transform: rotate(${(props) => (props.transform ? '135deg' : '0deg')});
    visibility: ${(props) => props.transform && 'hidden'}; */
    color: black;
`;

export const Close = styled(CircleXmark)`
    width: 3rem;
    font-size: 400px;
    color: tomato;
    transition: all 200ms linear;
`;
