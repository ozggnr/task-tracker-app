import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
    colors: {
        primary: '#362e54',
        secondary: '#fcfaf2',
        danger: '#ee6060',
        warning: '#fb8c00',
        success: '#0B9B8A',
    },
    statusColors: {
        completed: {
            badge: '#0B9B8A',
            bg: '#0B9B8A54',
        },
        notCompleted: {
            badge: '#ffa726',
            bg: '#ffa72654',
        },
        inProgress: {
            badge: '#8707ff',
            bg: '#8707ff54',
        },
    },
};

export default function Theme({ children }: PropsWithChildren) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
