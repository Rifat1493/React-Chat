import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearToken } from '../store/AuthSlice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/logout/', {}, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      dispatch(clearToken());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center">
          Logout
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout} fullWidth>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Logout;
