import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Paper, CssBaseline, Typography, Button, FormControl, FormGroup } from '@mui/material';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

// import PDF from "react-pdf-scroll";
import axios from "axios";


const ExamUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // The REST API endpoint
  const API_URL = `http://localhost:8000/api/user-detail/${id}`;

  const [examUserDetail, setExamUserDetail] = useState<any[]>([]);

  // Get Fetches the Data From API
  useEffect(() => {
    const examUserData = async () => {
      try {
        const { data: response } = await axios.get(API_URL);
        setExamUserDetail([response]);
        // console.log('Exam User Data => ', [response]);
      } catch (error) {
        // console.error(error)
      }
    };
    examUserData();
  }, [API_URL]);

  const handleChangeApprove = async (user_id: any) => {
    await axios.post(`http://localhost:8000/api/approve-user/${user_id}`)
      .then(response => {
        console.log(response.data);
      });
    navigate("/examuserlists");
  };

  const handleClose = () => {
    navigate("/examuserlists");
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Container maxWidth='xl'>
          <TableContainer component={Paper} elevation={3}>
            <Typography variant="h2">Exam User Details</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Japanese Level</TableCell>
                  <TableCell>Location Place</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Date Of Birth</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Viber Number</TableCell>
                  <TableCell>Application Form</TableCell>
                  <TableCell>ID Card</TableCell>
                  <TableCell>Photo</TableCell>
                </TableRow>
              </TableHead>
              {examUserDetail.length > 0 && (
                <TableBody>
                  {examUserDetail.map((examUsers) => (
                    <TableRow key={examUsers}>
                      <TableCell>{examUsers.name}</TableCell>
                      <TableCell>{examUsers.email}</TableCell>
                      <TableCell>{examUsers.level}</TableCell>
                      <TableCell>{examUsers.test_site}</TableCell>
                      <TableCell>{examUsers.gender}</TableCell>
                      <TableCell>{examUsers.date_of_birth}</TableCell>
                      <TableCell>{examUsers.phone}</TableCell>
                      <TableCell>{examUsers.viber_no}</TableCell>
                      <TableCell><a target="_blank" rel="noopener noreferrer" className="btn-link" href={"http://localhost:8000/storage/images/" + examUsers.user_id + '/' + examUsers.application_form}>PDF File</a></TableCell>
                      <TableCell><a target="_blank" rel="noopener noreferrer" className="btn-link" href={"http://localhost:8000/storage/images/" + examUsers.user_id + '/' + examUsers.id_card}>ID Card</a></TableCell>
                      <TableCell><a target="_blank" rel="noopener noreferrer" className="btn-link" href={"http://localhost:8000/storage/images/" + examUsers.user_id + '/' + examUsers.photo}>Photo</a></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <FormControl fullWidth>
            <FormGroup>
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={() => { handleChangeApprove(examUserDetail[0].user_id) }}>Approve</Button>
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
                display: 'flex',
                flexWrap: 'wrap',
                ".MuiTableHead-root": {
                  display: 'block',
                  width: '30%',
                  ".MuiTableRow-root": {
                    display: 'block',
                    width: 'auto',
                    ".MuiTableCell-root": {
                      display: 'block',
                      fontWeight: '600',
                      color: '#48787d',
                    },
                  },
                },
                ".MuiTableBody-root": {
                  display: 'block',
                  width: '70%',
                  ".MuiTableRow-root": {
                    display: 'block',
                    ".MuiTableCell-root": {
                      display: 'block',
                      lineHeight: '1.5rem',
                      color: '#333',
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

export default ExamUserDetails;