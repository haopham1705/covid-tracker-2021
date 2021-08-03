import { createTheme } from '@material-ui/core/styles';
import typography from './typography';
const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#01bf71', 
        },
        secondary: {
            main: '#174587'
        },
        custom: {
            white: '#fff',
            grey: '#a3a3a330'
        },
        background: {
            default: 'rgb(244, 246, 248)',
            paper: '#fff'
        },
        type: 'light',
        text: {
            primary: '#000',
            secondary: '#333',
            green: '#01bf71',
            white: '#fff'
        },
        shadow: {
            box_shadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }
    },
    typography
});

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#333'
        },
        secondary: {
            main: '#fffff'
        },
        background: {
            default: '#3a3b3c',
            paper: '#18191a'
        },
        custom: {
            white: '#fff',
            grey: '#a3a3a330'
        },
        type: 'dark',
        text: {
            primary: '#fff',
            secondary: '#fff',
            green: '#01bf71',
            white: '#fff'
        },
        shadow: {
            box_shadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }
    },
    typography
});

export { lightTheme, darkTheme };
