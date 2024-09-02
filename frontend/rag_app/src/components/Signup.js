// src/components/Signup.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/signup/', {
        username,
        email,
        password,
      });
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      console.error('Signup failed', error);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center">
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
