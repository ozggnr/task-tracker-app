import styled from "styled-components";

export const CalendarDateContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 800;
    color: #2F0147 ;
    margin-top: 1.5rem;
`
export const CalendarContainer = styled.div`
    padding-top: 1rem;
    height: calc(100vh - 2rem);
    max-height: calc(100vh - 2rem);
    overflow: auto;
    margin: auto 24px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`