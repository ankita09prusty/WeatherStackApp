import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import axios from '../api/axiosInstance'; // Ensure axiosInstance is configured with baseURL

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async () => {
    try {
      setError(null); 
      setSuccess(false); 

      const response = await axios.post('/auth/signup', { username, password });

      if (response.status === 200) {
        setSuccess(true); 
      }
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <Grid container style={{ minHeight: '100vh' }} alignItems="center" justifyContent="center">
      <Grid item xs={10} sm={6} md={4}>
        <Paper style={{ padding: '20px' }} elevation={3}>
          <Typography variant="h4" gutterBottom>
            Signup
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
          {success && (
            <Alert severity="success" style={{ marginTop: '20px' }}>
              Signup successful! You can now log in.
            </Alert>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignup}
            style={{ marginTop: '20px' }}
          >
            Signup
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Signup;
