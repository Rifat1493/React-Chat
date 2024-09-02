// src/components/Logout.js
import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setToken }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout API
      await axios.post('http://127.0.0.1:8000/api/auth/logout/', {}, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      // Clear token from localStorage and state
      localStorage.removeItem('token');
      setToken(null);

      // Redirect to login page
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
