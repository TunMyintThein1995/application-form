import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { createTheme, ThemeProvider } from '@mui/material';
import { Container, CssBaseline, Box, Paper, Typography } from '@mui/material';
import { FormControlLabel, FormControl, FormGroup, FormLabel, FormHelperText } from '@mui/material';
import { RadioGroup, Radio, Button, Switch, TextField, MenuItem } from '@mui/material';

import DateTimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

import { validationSchema } from './Validation';


type FormInputs = {
  exam_date: any;
  level: string;
  test_site: string;
  count: number;
  start_date: any;
  end_date: any;
  active: boolean;
};


const LevelFormCreateEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState, setValue } = useForm<FormInputs>({
    mode: "onChange",
    resolver: yupResolver(validationSchema)
  });
  const { errors } = formState;

  const [action, setAction] = useState<any | null>();

  const onSubmit = (data: any) => {
    console.log('Level Data =>', data);
    try {
      const formData = new FormData();
      formData.append('exam_date', data.exam_date);
      formData.append('level', data.level);
      // formData.append('test_site', data.test_site);
      formData.append('start_date', data.start_date);
      formData.append('end_date', data.end_date);
      formData.append('active', data.active);
      if (id) {
        axios.post(`http://localhost:8000/api/update-level/${id}`, formData)
          .then(response => {
            console.log(response.data);
          });
      } else {
        axios.post('http://localhost:8000/api/create-level', formData)
          .then(response => {
            console.log(response.data);
          });
      };
      navigate("/levelformlists");
    } catch (error) {
      console.log(error);
    }
  };

  // Get Fetches the Data From API
  useEffect(() => {
    setAction(id ? "Update" : "Create");
    const adminData = async () => {
      try {
        const { data: response } = await axios.get(`http://localhost:8000/api/level-detail/${id}`);
        // setValue('exam_date', response.exam_date);
        setValue('level', response.level);
        // setValue('test_site', response.test_site);
        // setValue('start_date', response.start_date);
        // setValue('end_date', response.end_date);
        setValue('active', response.active);
        console.log('Level Form Data =>', response);
      } catch (error) {
        // console.error(error)
      }
    };
    adminData();
  }, [id, setValue]);

  const handleClose = () => {
    navigate('/levelformlists');
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className='level-form'>
        <Container maxWidth="xl">
          <Box component={Paper} elevation={3}>
            <Typography variant="h2">{id ? "Edit" : "Create"} Level Forms</Typography>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              <Controller
                name="exam_date"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    type="date"
                    variant="outlined"
                    label="Exam Date"
                    size="small"
                    value={value || ''}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? 'Exam Date' + error.message : null}
                  />
                )}
              />
              <Controller
                name="level"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    select
                    label="Choose Your level"
                    variant="outlined"
                    size="small"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? 'Choose Your level' + error.message : null}
                  >
                    <MenuItem value="N1">N1</MenuItem>
                    <MenuItem value="N2">N2</MenuItem>
                    <MenuItem value="N3">N3</MenuItem>
                    <MenuItem value="N4">N4</MenuItem>
                  </TextField>
                )}
              />
              <FormControl fullWidth>
                <FormLabel id="demo-radio-buttons-group-label">Choose Your location Place</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="yangon"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="yangon" {...register("test_site")} control={<Radio />} label="Yangon" />
                  <FormControlLabel value="mandalay" {...register("test_site")} control={<Radio />} label="Mandalay" />
                  <FormControlLabel value="bago" {...register("test_site")} control={<Radio />} label="Bago" />
                </RadioGroup>
              </FormControl>
              <Controller
                name="count"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    type="number"
                    variant="outlined"
                    label="Count Number"
                    size="small"
                    value={value || ''}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? 'Count Number' + error.message : null}
                  />
                )}
              />
              <Controller
                name="start_date"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    type="date"
                    variant="outlined"
                    label="Start Date"
                    size="small"
                    value={value || ''}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? 'Start Date' + error.message : null}
                  />
                )}
              />
              <Controller
                name="end_date"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    type="date"
                    variant="outlined"
                    label="End Date"
                    size="small"
                    value={value || ''}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? 'End Date' + error.message : null}
                  />
                )}
              />
              <FormControl fullWidth>
                <FormGroup>
                  <FormControlLabel control={
                    <Switch
                      {...register("active")}
                    />
                  }
                    label="Active" />
                </FormGroup>
              </FormControl>
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
  typography: {
    h2: {
      marginBottom: '25px',
      fontSize: '2rem',
      fontWeight: '500',
      lineHeight: '1.334',
      letterSpacing: '0',
      textAlign: 'center',
      color: '#48787d',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiBox-root": {
          ".MuiContainer-root": {
            ".MuiPaper-root": {
              padding: '30px',
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

export default LevelFormCreateEdit;