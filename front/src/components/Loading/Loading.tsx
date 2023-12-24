import React from 'react';
import ReactLoading from "react-loading";
import { Box } from '@mui/material';


const Loading = () => {


  return (
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <ReactLoading type="spin" color="#48787d"
        height={50} width={50} />
    </Box>
  );
};

export default Loading;