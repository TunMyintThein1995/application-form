import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Paper, CssBaseline, Typography } from '@mui/material';
import { Button, FormControl, FormGroup } from '@mui/material';
import { TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material';

import axios from "axios";


const MailFormsDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // The REST API endpoint
  const API_URL = `http://localhost:8000/api/show-mail`;

  const [mail, setMailData] = useState<any[]>([]);

  // Get Fetches the Data From API
  useEffect(() => {
    const mailData = async () => {
      try {
        const { data: response } = await axios.post(API_URL);
        setMailData([response]);
      } catch (error) {
      }
    };
    mailData();
  }, [API_URL]);

  const handleSend = async () => {
    axios.post('http://localhost:8000/api/send-mail', location.state)
      .then(response => {
        console.log(response.data);
      });
  };

  const handleClose = () => {
    navigate('/examuserlists');
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Container maxWidth='xl'>
          <TableContainer component={Paper} elevation={3}>
            <Typography variant="h2">Mail Form Details</Typography>
            <Table>
              {mail.length > 0 && (
                <TableBody>
                  {mail.map((examUsers) => (
                    <TableRow key={examUsers}>
                      <TableCell>{examUsers.title}</TableCell>
                      <TableCell>{examUsers.body}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <FormControl fullWidth>
            <FormGroup>
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={handleSend}>Send</Button>
            </FormGroup>
          </FormControl>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

const theme = createTheme({
  typography: {
    h2: {
      marginBottom: '25px',
      fontSize: '2rem',
      fontWeight: '500',
      lineHeight: '1.334',
      letterSpacing: '0',
      color: '#48787d',
      textAlign: 'center',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiBox-root": {
          ".MuiContainer-root": {
            ".MuiPaper-root": {
              padding: '30px',
              marginBottom: '30px',
              ".MuiTable-root": {
                ".MuiTableBody-root": {
                  ".MuiTableRow-root": {
                    ".MuiTableCell-root": {
                      display: 'block',
                      lineHeight: '1.5rem',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});

export default MailFormsDetail;