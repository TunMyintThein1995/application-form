import React from 'react';
import { useForm } from "react-hook-form";
import { createTheme, FormControl, FormGroup, ThemeProvider } from '@mui/material';
import { Container, CssBaseline, Box, Typography } from '@mui/material';
import { Modal, Paper } from '@mui/material';
import { Button } from '@mui/material';


const DeleteModal = (props: any) => {
  const { handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = () => {
    try {
      props.handleDelete(props.currentDelete);
      // console.log('Modal =>', props.currentAdmin);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Modal open={props.open} onClose={props.handleClose}>
        <Box className='modalbox'>
          <Container maxWidth="sm">
            <Box component={Paper} elevation={3}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h3">Are you sure to delete?</Typography>
                <FormControl fullWidth>
                  <FormGroup>
                    <Button onClick={props.handleClose} variant="outlined">Cancel</Button>
                    <Button type="submit" variant="contained" color="secondary">Delete</Button>
                  </FormGroup>
                </FormControl>
              </form>
            </Box>
          </Container>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

const theme = createTheme({
  typography: {
    h3: {
      marginBottom: '30px',
      fontSize: '1.8rem',
      textAlign: 'center',
      color: '#48787d',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiBox-root.modalbox": {
          position: 'absolute',
          width: '50%',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, 0)',
          ".MuiContainer-root": {
            ".MuiPaper-root": {
              ".MuiFormGroup-root": {
                justifyContent: 'space-between',
                flexDirection: 'unset',
                ".MuiButton-outlined": {
                  marginRight: '0',
                  "&:hover": {
                    color: '#FFF',
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

export default DeleteModal;