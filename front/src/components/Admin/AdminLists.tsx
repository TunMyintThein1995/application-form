import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { Box, CssBaseline, Paper } from '@mui/material';
import { Container, Typography } from '@mui/material';
import { Stack, Button } from '@mui/material';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

import axios from "axios";
import Loading from '../Loading/Loading';
import DeleteModal from '../Modal/DeleteModal';


const AdminLists = () => {

  // The REST API endpoint
  const API_URL = 'http://localhost:8000/api/admin-list';

  const [isLoading, setIsLoading] = useState(true);
  const [adminLists, setAdminLists] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState();

  // Get Fetches the Data From API
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const examUserData = async () => {
      try {
        const { data: response } = await axios.get(API_URL);
        setAdminLists(response);
      } catch (error) {
        console.log(error);
      }
    };
    examUserData();
  }, []);

  // Handle Delete Open Action
  const handleDeleteOpen = (admin: any) => {
    setCurrentAdmin(admin.id);
    setOpen(true);
  };

  // Handle Delete Action
  const handleDelete = (id: any) => {
    axios.delete(`http://localhost:8000/api/delete-admin/${id}`)
      .then(response => {
        const adminData = adminLists.filter((admin: any) => admin.id !== id);
        setAdminLists(adminData);
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
                <Typography variant="h2">Admin Profile</Typography>
                <Link to="/admin/create" className="underline">
                  <Button variant="contained" className="btn-add">Add Admin</Button>
                </Link>
              </Stack>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adminLists.map((admin) => (
                      <TableRow key={admin.id} >
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{admin.phone}</TableCell>
                        <TableCell>
                          <Link to={`/admin/edit/${admin.id}`} className="underline">
                            <Button variant="outlined">Edit</Button>
                          </Link>
                          <Button onClick={() => { handleDeleteOpen(admin) }} variant="contained" color="secondary">Delete</Button>
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
            currentDelete={currentAdmin}
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

export default AdminLists;