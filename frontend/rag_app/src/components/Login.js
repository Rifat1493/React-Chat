// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', { username, password });
      const token = response.data.key;
      setToken(token);
      localStorage.setItem('token', token); // Save token in localStorage
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
