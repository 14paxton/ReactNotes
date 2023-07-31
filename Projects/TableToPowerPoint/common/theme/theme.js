import { createMuiTheme } from '@material-ui/core/styles';

const blueBase = 'rgba(61,91,169,1)';
const blue140 = 'rgba(37,55,101,1)';
const blue80 = 'rgba(100,124,186,1)';
const teal120 = 'rgba(50,149,151,1)';
const tealBase = 'rgba(63,186,189,1)';
const teal60 = 'rgba(140,214,215,1)';

export default createMuiTheme({
  shape: {
    borderRadius: 8
  },
  palette: {
    primary: {
      light: blue80,
      main: blueBase,
      dark: blue140,
      contrastText: '#FFF'
    },
    secondary: {
      light: teal60,
      main: tealBase,
      dark: teal120,
      contrastText: '#FFF'
    },
    blue: {
      base: blueBase,
      140: blue140,
      120: 'rgba(49,73,135,1)',
      100: blueBase,
      80: blue80,
      60: 'rgba(139,157,203,1)',
      40: 'rgba(177,189,221,1)',
      20: 'rgba(216,222,238,1)',
      10: 'rgba(235,238,246,1)'
    },
    teal: {
      base: tealBase,
      120: teal120,
      100: tealBase,
      60: teal60
    },
    orange: {
      base: 'rgba(243,162,52,1)',
      120: 'rgba(232,98,57,1)',
      100: 'rgba(243,162,52,1)',
      80: 'rgba(243,182,53,1)',
      60: 'rgba(251,205,51,1)'
    },
    green: {
      base: 'rgba(79,156,68,1)',
      120: 'rgba(48,143,68,1)',
      100: 'rgba(79,156,68,1)',
      80: 'rgba(133,180,64,1)',
      60: 'rgba(169,197,56,1)'
    },
    black: {
      87: 'rgba(0,0,0,0.87)',
      54: 'rgba(0,0,0,0.54)'
    },
    white: {
      100: 'rgba(255,255,255,1)'
    },
    divider: '#B1BDDD'
  },
  typography: {
    fontSize: 14,

    fontFamily: '\'Open Sans\', sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: '3rem'
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: '2.5rem'
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: '2rem'
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: '1.66rem'
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: '1.33rem'
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.16rem'
    },
    body1: {
      fontSize: '1rem'
    },
    body2: {
      fontSize: '0.875rem'
    }
  }
});
