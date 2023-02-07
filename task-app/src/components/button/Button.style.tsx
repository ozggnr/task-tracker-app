import styled from 'styled-components';
import { MessageContainer } from '../message/Message.style';

//button styling
export const BaseButton = styled.button`
    padding: 0.5rem 0.5rem;
    background-color: #362e54;
    color: #fcfaf2;
    text-transform: uppercase;
    font-weight: bolder;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    :disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const ButtonSave = styled(BaseButton)`
    background-color: blue;
`;

export const ButtonDelete = styled(BaseButton)`
    color: #ee6060;
    background-color: #fff;
    border: 1px solid #ee6060;
`;

export const ButtonCancel = styled(BaseButton)`
    background-color: green;
`;
export const ButtonEdit = styled(BaseButton)`
    background-color: #fff;
    color: #362e54;
    border: 1px solid #362e54;
`;

export const ButtonCaret = styled(BaseButton)`
    width: 2rem;
    padding: 0.5rem 0;
`;

export const ButtonToday = styled(BaseButton)`
    width: 4rem;
    padding: 0;
    font-size: 0.75rem;
`;

//it will help pass the props just to the buttondays and it will not pass to base button
interface ButtonDaysProps {
    readonly isActive: boolean;
    readonly taskCompleted?: boolean | null;
}

export const ButtonDays = styled.button<ButtonDaysProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${(props) =>
        props.taskCompleted === null ? 'none' : props.taskCompleted ? '2px solid #0B9B8A' : '2px solid #ffa726'};

    // before the slash we set horizontal radius, after the slash we set vertical radius
    border-radius: 100px 50% / 20px 30px;
    line-height: 3rem;
    font-weight: 700;
    padding: ${(props) => (props.isActive ? '2rem' : '1rem')};
    font-size: ${(props) => (props.isActive ? '1.25rem' : '1rem')};
    width: ${(props) => (props.isActive ? '6rem' : '5rem')};
    height: ${(props) => (props.isActive ? '7rem' : '6rem')};
    // color: ${(props) => (props.isActive ? '' : '#362e54')};
    background: ${(props) => (props.isActive ? '#FCFAF2' : 'none')};
`;

//button containers
// "$" is transient props. We use it since we just want to pass it to styled component and not to DOM or React Node
interface ButtonGroupProps {
    readonly $start?: boolean;
    readonly $center?: boolean;
    readonly $end?: boolean;
}
export const ButtonGroup = styled.div<ButtonGroupProps>`
    display: flex;
    justify-content: ${(props) =>
        props.$start ? 'flex-start' : props.$center ? 'center' : props.$end ? 'flex-end' : ''};
    column-gap: 0.5rem;
`;
interface ButtonRowProps {
    readonly width?: string;
    readonly position: string;
    readonly pt?: string;
    readonly pl?: string;
    readonly pr?: string;
    readonly pb?: string;
}
export const ButtonRow = styled.div<ButtonRowProps>`
    width: ${(props) => (props.width ? props.width + '%' : '100%')};
    display: flex;
    justify-content: ${(props) =>
        props.position === 'start'
            ? 'flex-start'
            : props.position === 'center'
            ? 'center'
            : props.position === 'end'
            ? 'flex-end'
            : ''};
    padding-top: ${(props) => props.pt && props.pt + 'rem'};
    padding-left: ${(props) => props.pl && props.pl + 'rem'};
    padding-right: ${(props) => props.pr && props.pr + 'rem'};
    padding-bottom: ${(props) => props.pb && props.pb + 'rem'};
`;
