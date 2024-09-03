import React, { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Home = () => {
  const [prediction, setPrediction] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const handlePredict = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/predict/', {
        firstName: 'Fred',
        lastName: 'Flintstone',
        orders: [1, 2, 3]
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setPrediction(response.data);
    } catch (error) {
      console.error('Prediction failed', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center">
          Predict
        </Typography>
        <Button variant="contained" color="primary" onClick={handlePredict} fullWidth>
          Get Prediction
        </Button>
        {prediction && (
          <Typography variant="body1" sx={{ mt: 4 }}>
            Prediction Result: {JSON.stringify(prediction)}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Home;
