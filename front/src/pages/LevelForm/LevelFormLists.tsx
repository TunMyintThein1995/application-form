import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { Box, CssBaseline, Paper } from '@mui/material';
import { Container, Typography } from '@mui/material';
import { Stack, Button } from '@mui/material';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

import axios from "axios";
import Loading from '../../components/Loading/Loading';
import DeleteModal from '../../components/Modal/DeleteModal';


const LevelFormLists = () => {

  // The REST API endpoint
  const API_URL = 'http://localhost:8000/api/level-list';

  const [isLoading, setIsLoading] = useState(true);
  const [levelLists, setLevelLists] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState();

  // Get Fetches the Data From API
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const levelFormData = async () => {
      try {
        const { data: response } = await axios.get(API_URL);
        setLevelLists(response);
      } catch (error) {
        console.log(error);
      }
    };
    levelFormData();
  }, []);

  // Handle Delete Open Action
  const handleDeleteOpen = (level: any) => {
    console.log('Current Level ID', level)
    setCurrentLevel(level.id);
    setOpen(true);
  };

  // Handle Delete Action
  const handleDelete = (id: any) => {
    axios.delete(`http://localhost:8000/api/delete-level/${id}`)
      .then(response => {
        const levelData = levelLists.filter((level: any) => level.id !== id);
        setLevelLists(levelData);
        // console.log('response =>', response.data);
      });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
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
              <Stack direction="row" className="admin-list lists">
                <Typography variant="h2">Level Form Lists</Typography>
                <Link to="/levelform/create" className="underline">
                  <Button variant="contained" className="btn-add">Add Level</Button>
                </Link>
              </Stack>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Exam Date</TableCell>
                      <TableCell>Level</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {levelLists.map((level) => (
                      <TableRow key={level.id} >
                        <TableCell>{level.exam_date}</TableCell>
                        <TableCell>{level.level}</TableCell>
                        <TableCell>{level.start_date}</TableCell>
                        <TableCell>{level.end_date}</TableCell>
                        <TableCell>
                          <Link to={`/levelform/edit/${level.id}`} className="underline">
                            <Button variant="outlined">Edit</Button>
                          </Link>
                          <Button onClick={() => { handleDeleteOpen(level) }} variant="contained" color="secondary">Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Container>
          <DeleteModal
            open={open}
            handleClose={handleClose}
            handleDelete={handleDelete}
            currentDelete={currentLevel}
          />
        </Box>
      )}
    </ThemeProvider>
  );
};

const theme = createTheme({
  typography: {
    h2: {
      fontSize: '2.3rem',
      fontWeight: '500',
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
              ".MuiButton-root": {
                width: '125px',
                textTransform: 'none',
              },
              ".MuiButton-outlined": {
                marginRight: '10px',
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

export default LevelFormLists;