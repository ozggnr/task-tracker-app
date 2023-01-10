import styled from 'styled-components';
import { BaseButton } from '../button/Button.style';

export const CalendarDateContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 800;
    color: #2f0147;
    margin: 1.5rem 6rem 0 6rem;
`;
export const CalendarContainer = styled.div`
    padding-top: 1rem;
    height: calc(100vh - 2rem);
    max-height: calc(100vh - 2rem);
    overflow: hidden;
    margin: auto 24px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;
export const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem;
`;
//button styling
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
}

export const ButtonDays = styled(BaseButton)<ButtonDaysProps>`
    padding: ${(props) => (props.isActive ? '2.75rem' : '1.75rem')};
    font-size: ${(props) => (props.isActive ? '1.5rem' : '1rem')};
    width: ${(props) => (props.isActive ? '4rem' : '3rem')};
    height: ${(props) => (props.isActive ? '6rem' : '4rem')};
    color: ${(props) => (props.isActive ? '' : '#362e54')};
    background-color: ${(props) => (props.isActive ? '' : '#FCFAF2')};
    line-height: ${(props) => (props.isActive ? '3rem' : '1.5rem')};
`;
