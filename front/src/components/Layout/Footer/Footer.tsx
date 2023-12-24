import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline, FormHelperText } from '@mui/material';


const Footer = () => {
  const getYear = () => {
    const currentYear = new Date().getFullYear();
    return currentYear;
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <footer>
        <FormHelperText className='footer'>Copyright &copy; {getYear()} SCM.All rights reserved.</FormHelperText>
      </footer>
    </ThemeProvider>
  );
};

const theme = createTheme({

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiFormHelperText-root.footer": {
          fontSize: '1.15rem',
          textAlign: 'center',
          color: '#333',
        },
      }
    }
  }
});

export default Footer;