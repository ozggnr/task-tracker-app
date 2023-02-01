import styled from 'styled-components';

export const BaseButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #362e54;
    color: #fcfaf2;
    text-transform: uppercase;
    font-weight: bolder;
    font-size: 1rem;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
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
interface ButtonGroupProps {
    readonly start?: boolean;
    readonly center?: boolean;
    readonly end?: boolean;
}
export const ButtonGroup = styled.div<ButtonGroupProps>`
    display: flex;
    justify-content: ${(props) => (props.start ? 'flex-start' : props.center ? 'center' : props.end ? 'flex-end' : '')};
    column-gap: 0.5rem;
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

export const ButtonDays = styled.button<ButtonDaysProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    // before the slash we set horizontal radius, after the slash we set vertical radius
    border-radius: 100px 50% / 20px 30px;
    line-height: 3rem;
    font-weight: 700;
    padding: ${(props) => (props.isActive ? '3rem' : '2rem')};
    font-size: ${(props) => (props.isActive ? '1.5rem' : '1.25rem')};
    width: ${(props) => (props.isActive ? '6rem' : '3rem')};
    height: ${(props) => (props.isActive ? '7rem' : '4rem')};
    // color: ${(props) => (props.isActive ? '' : '#362e54')};
    background: ${(props) => (props.isActive ? '#FCFAF2' : 'none')};
`;
