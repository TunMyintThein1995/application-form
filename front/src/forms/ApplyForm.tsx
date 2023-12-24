import React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { createTheme, ThemeProvider } from '@mui/material';
import { Container, CssBaseline, Box, Paper, Typography } from '@mui/material';
import { FormControlLabel, FormControl, FormGroup, FormLabel, FormHelperText } from '@mui/material';
import { Button, Radio, RadioGroup, TextField, Checkbox, MenuItem } from '@mui/material';

import axios from "axios";

import { validationSchema } from './Validation';


type FormInputs = {
  name: string;
  email: string;
  level: string;
  test_site: string;
  gender: string;
  date_of_birth: number;
  phone: number;
  viber_no: number;
  application_form: any;
  id_card: any;
  photo: any;
  agree: boolean;
};


const ApplyForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState } = useForm<FormInputs>({
    mode: "onChange",
    resolver: yupResolver(validationSchema)
  });
  const { errors } = formState;

  const onSubmit = (data: any) => {
    // console.log(data);
    try {
      const formData = new FormData();
      // console.log(data.application_form[0]);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('level', data.level);
      formData.append('test_site', data.test_site);
      formData.append('gender', data.gender);
      formData.append('date_of_birth', data.date_of_birth);
      formData.append('phone', data.phone);
      formData.append('viber_no', data.viber_no);
      formData.append('application_form', data.application_form[0]);
      formData.append('id_card', data.id_card[0]);
      formData.append('photo', data.photo[0]);
      formData.append('agree', data.agree);
      axios.post('http://localhost:8000/api/applyForm', formData)
        .then(response => {
          console.log(response.data);
        });
      navigate("/examuserlists");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className='jlptapply-form'>
        <Container maxWidth="xl">
          <Box component={Paper} elevation={3} className='apply-form'>
            <Typography variant="h2">JLPT Apply Forms</Typography>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    type="text"
                    label="Name"
                    variant="outlined"
                    size="small"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? 'Name' + error.message : null}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? 'Email' + error.message : null}
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
                    <MenuItem value="N5">N5</MenuItem>
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
                </RadioGroup>
              </FormControl>
              <FormControl fullWidth>
                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  defaultValue="female"
                  name="controlled-radio-buttons-group"
                >
                  <FormControlLabel value="female" {...register("gender")} control={<Radio />} label="Female" />
                  <FormControlLabel value="male" {...register("gender")} control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>
              <Controller
                name="date_of_birth"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    type="date"
                    variant="outlined"
                    size="small"
                    value={value || ''}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? 'Date Of Birth' + error.message : null}
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
                name="viber_no"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    type="number"
                    label="Viber Number"
                    variant="outlined"
                    size="small"
                    value={value || ''}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? 'Viber Number' + error.message : null}
                  />
                )}
              />
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  type="file"
                  variant="outlined"
                  size="small"
                  {...register("application_form")}
                />
                {errors.application_form && <FormHelperText error>{errors.application_form?.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  type="file"
                  variant="outlined"
                  size="small"
                  {...register("id_card")}
                />
                {errors.id_card && <FormHelperText error>{errors.id_card?.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  type="file"
                  variant="outlined"
                  size="small"
                  {...register("photo")}
                />
                {errors.photo && <FormHelperText error>{errors.photo?.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("agree")}
                      />
                    }
                    label="I agree"
                  />
                </FormGroup>
                {errors.agree && <FormHelperText error>{errors.agree?.message}</FormHelperText>}
              </FormControl>
              <Button variant="contained" type="submit">Submit</Button>
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
        ".MuiBox-root.jlptapply-form": {
          // position: 'relative',
          // zIndex: '99999',
          ".MuiContainer-root": {
            ".MuiPaper-root": {
              padding: '30px',
              // borderRadius: '0',
              ".MuiFormControl-root": {
                marginBottom: '25px',
                ".MuiFormControl-root": {
                  marginBottom: '0',
                },
                ".MuiFormGroup-root": {
                  flexDirection: 'unset'
                },
              },
            },
          },
        },
      },
    },
  },
});

export default ApplyForm;