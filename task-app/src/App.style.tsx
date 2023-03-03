import styled from 'styled-components';
import { Row } from './Main.style';

export const CalendarContainer = styled.div`
    background-image: url('images/back3.png');
    background-position: center center;
    background-size: cover;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;
export const CalendarHeader = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 2rem 1rem 2rem;
    align-items: center;
    margin: 0 auto;
    width: 100%;
`;
export const CalendarContent = styled.main`
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    margin: 0 auto 1rem auto;
    width: 90%;
    backdrop-filter: blur(16px) saturate(180%);
    background-color: rgb(255 255 255 / 63%);
    border-radius: 0.5rem;
`;

export const CalendarDate = styled.div`
    display: flex;
    flex-direction: column;
`;
export const DayWeek = styled.div``;
export const DayMonth = styled.div``;
export const CalendarButtonsRow = styled(Row)`
    justify-content: flex-end;
    column-gap: 0.4rem;
`;
export const CalendarDateContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 800;
    margin: 1.5em auto 1em auto;
    width: 90%;
`;

export const Title = styled.h1`
    color: ${(props) => props.theme.colors.primary};
    width: 100%;
`;
