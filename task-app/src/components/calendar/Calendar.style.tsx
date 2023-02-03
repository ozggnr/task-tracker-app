import styled from 'styled-components';

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
    padding: 1rem 3rem 1rem 3rem;
    align-items: center;
    margin: 0.5rem;
`;
export const CalendarContent = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    margin: 1rem 5rem 1rem 5rem;
    backdrop-filter: blur(16px) saturate(180%);
    background-color: rgb(255 255 255 / 63%);
`;
export const CalendarDate = styled.div`
    display: flex;
    flex-direction: column;
`;
export const DayWeek = styled.div``;
export const DayMonth = styled.div``;
export const CalendarDateContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 800;
    color: #2f0147;
    margin: 1.5rem 6rem 0 6rem;
`;
