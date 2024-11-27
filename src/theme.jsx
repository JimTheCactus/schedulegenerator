import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  useFlexGap: true,
  palette: {
    primary: {
      main: '#e9958f',
    },
    secondary: {
      main: '#e98fb6',
    },
    error: {
      main: '#e9c28f',
    },
  },
});

export default theme;
