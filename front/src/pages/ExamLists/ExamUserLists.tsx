import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Paper, CssBaseline, Typography, Stack } from '@mui/material';
import { Button, Checkbox } from '@mui/material';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

import PreviewIcon from '@mui/icons-material/Preview';

import axios from "axios";
import Loading from '../../components/Loading/Loading';
import { SelectAll } from '@mui/icons-material';


const ExamUserLists = () => {
  const navigate = useNavigate();

  // The REST API endpoint
  const API_URL = 'http://localhost:8000/api/exam-user-list';

  const [isLoading, setIsLoading] = useState(true);
  const [examLists, setExamLists] = useState<any[]>([]);
  const [selectedAll, setSelectedAll] = useState<any[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);

  // Get Fetches the Data From API
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const examUserData = async () => {
      try {
        const { data: response } = await axios.get(API_URL);
        setExamLists(response);
      } catch (error) {
      }
    };
    examUserData();
  }, []);

  const handleSelectAllClick = (userAllData: any) => {
    const { value } = userAllData.target;
    setCheckedAll(!checkedAll);
    if (!checkedAll) {
      setSelectedAll(examLists.map((examItem: any) => (
        examItem.user_id
      )));
    } else {
      setSelectedAll([]);
    }
  };

  const handleChangeSelectAll = (userData: any) => {
    const { value, checked } = userData.target;
    setSelectedAll([...selectedAll, value * 1]);

    if (!checked) {
      setSelectedAll(selectedAll.filter((item: any) => item != value));
    }
  };

  const handelUserData = async (data: any) => {
    axios.post('http://localhost:8000/api/show-mail', selectedAll)
      .then(response => {
        navigate('/mailforms', { state: selectedAll });
      });
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoading ? (
        <Loading />
      ) : (
        <Box>
          <Container maxWidth="xl">
            <Box component={Paper} elevation={3}>
              <Stack direction="row" className="lists">
                <Typography variant="h2">Exam User Lists</Typography>
                <Button onClick={handelUserData} variant="contained" className="btn-add">Send Mail</Button>
              </Stack>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox color="primary"
                          value="allExamUsers"
                          onChange={handleSelectAllClick}
                          checked={checkedAll}
                        />
                      </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Japanese Level</TableCell>
                      <TableCell>Location Place</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Date Of Birth</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {examLists.map((examUsers) => (
                      <TableRow key={examUsers.user_id} >
                        <TableCell padding="checkbox">
                          <Checkbox color="primary"
                            value={examUsers.user_id}
                            onChange={handleChangeSelectAll}
                            checked={selectedAll.includes(examUsers.user_id)}
                          />
                        </TableCell>
                        <TableCell>{examUsers.name}</TableCell>
                        <TableCell>{examUsers.email}</TableCell>
                        <TableCell>{examUsers.level}</TableCell>
                        <TableCell>{examUsers.test_site}</TableCell>
                        <TableCell>{examUsers.gender}</TableCell>
                        <TableCell>{examUsers.date_of_birth}</TableCell>
                        <TableCell>{examUsers.phone}</TableCell>
                        <TableCell>{examUsers.status}</TableCell>
                        <TableCell>
                          <Link to={`/user/detail/${examUsers.user_id}`}>
                            <Button variant="outlined" startIcon={<PreviewIcon />}>
                              Detail
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Container>
        </Box>
      )}
    </ThemeProvider>
  );
};

const theme = createTheme({
  typography: {
    h2: {
      fontSize: '2.3rem',
      fontWeight: '400',
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
              ".MuiButton-outlined": {
                color: '#48787d',
                borderColor: '#48787d',
              },
            },
          },
        },
      },
    },
  },
});

export default ExamUserLists;