import styled from 'styled-components';
import { BaseButton } from '../button/Button.style';

export const CalendarDateContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 800;
    color: #2f0147;
    margin-top: 1.5rem;
`;
export const CalendarContainer = styled.div`
    padding-top: 1rem;
    height: calc(100vh - 2rem);
    max-height: calc(100vh - 2rem);
    overflow: auto;
    margin: auto 24px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

export const ButtonCaret = styled(BaseButton)`
    width: 50px;
    padding: 0;
`;

export const ButtonToday = styled(BaseButton)`
    width: 75px;
    padding: 0;
`;
