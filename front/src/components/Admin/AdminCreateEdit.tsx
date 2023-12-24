import React, { useEffect, useState, } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThemeProvider, createTheme } from '@mui/material';
import { Box, CssBaseline, Paper, Container, Typography } from '@mui/material';
import { FormGroup, FormControl } from '@mui/material';
import { TextField, Button } from '@mui/material';

import axios from "axios";

import { validationSchema } from './Validation';


type FormInputs = {
  email: string;
  phone: number;
  password: string;
};


const AdminCreateEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // The REST API endpoint
  const API_URL = `http://localhost:8000/api/admin-detail/${id}`;

  const [action, setAction] = useState<any | null>();

  const { handleSubmit, control, setValue } = useForm<FormInputs>({
    mode: "onChange",
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: any) => {
    // console.log(data);
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('password', data.password);
    if (id) {
      axios.post(`http://localhost:8000/api/update-admin/${id}`, formData)
        .then(response => {
          console.log(response.data);
        });
    } else {
      axios.post('http://localhost:8000/api/create-admin', formData)
        .then(response => {
          console.log(response.data);
        });
    };
    navigate('/adminlists');
  };

  // Get Fetches the Data From API
  useEffect(() => {
    setAction(id ? "Update" : "Create");
    const adminData = async () => {
      try {
        const { data: response } = await axios.get(API_URL);
        setValue('email', response.email);
        setValue('phone', response.phone);
        // console.log('ExamLists Data =>', response);
      } catch (error) {
        // console.error(error)
      }
    };
    adminData();
  }, [id, API_URL, setValue]);

  const handleClose = () => {
    navigate('/adminlists');
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Container maxWidth="xl">
          <Box component={Paper} elevation={3}>
            <Typography variant="h2">{id ? "Edit" : "Create"} Admin Profile</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    value={value || ''}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? 'Email' + error.message : null}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    type="number"
                    label="Phone Number"
                    variant="outlined"
                    size="small"
                    value={value || ''}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? 'Phone Number' + error.message : null}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    variant="outlined"
                    size="small"
                    value={value || ''}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? 'Password' + error.message : null}
                  />
                )}
              />
              <FormControl fullWidth>
                <FormGroup>
                  <Button onClick={handleClose} variant="outlined">Cancel</Button>
                  <Button variant="contained" type="submit">{action}</Button>
                </FormGroup>
              </FormControl>
            </form>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiBox-root": {
          ".MuiContainer-root": {
            ".MuiPaper-root": {
              padding: '34px 24px',
              ".MuiTypography-root": {
                marginBottom: '25px',
                fontSize: '2.2rem',
                color: '#48787d',
                fontWeight: '400',
              },
              ".MuiFormControl-root": {
                marginBottom: '25px',
                "&:last-of-type": {
                  marginBottom: '0',
                },
              },
            },
          },
        },
      },
    },
  },
});

export default AdminCreateEdit;