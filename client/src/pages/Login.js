import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import axios from '../api/axiosInstance'; 
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      setError(null); 

      const response = await axios.post('/auth/login', { username, password });
      const { token } = response.data;

      
      localStorage.setItem('token', token);

      
      navigate('/weather');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <Grid container style={{ minHeight: '100vh' }} alignItems="center" justifyContent="center">
      <Grid item xs={10} sm={6} md={4}>
        <Paper style={{ padding: '20px' }} elevation={3}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Alert severity="error" style={{ marginTop: '20px' }}>
              {error}
            </Alert>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            style={{ marginTop: '20px' }}
          >
            Login
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
