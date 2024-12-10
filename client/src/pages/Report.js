import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from '@mui/material';

function Report() {
  const [report, setReport] = useState([]);
  const [error, setError] = useState(null);

  const fetchReport = async () => {
    try {
      setError(null);

      const response = await fetch('http://localhost:5000/report', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch report');
      }

      const data = await response.json();
      setReport(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch report. Please try again.');
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <Grid container style={{ minHeight: '100vh' }} alignItems="center" justifyContent="center">
      <Grid item xs={10} sm={8} md={6}>
        <Paper style={{ padding: '20px' }} elevation={3}>
          <Typography variant="h4" gutterBottom>
            Weather Search Report
          </Typography>
          {error && (
            <Alert severity="error" style={{ marginTop: '20px' }}>
              {error}
            </Alert>
          )}
          {!error && report.length === 0 && (
            <Typography style={{ marginTop: '20px' }} color="textSecondary">
              No report data available.
            </Typography>
          )}
          {report.length > 0 && (
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>User</strong></TableCell>
                    <TableCell><strong>City</strong></TableCell>
                    <TableCell><strong>Weather</strong></TableCell>
                    <TableCell><strong>Searched At</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {report.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.username}</TableCell>
                      <TableCell>{item.city}</TableCell>
                      <TableCell>
                        <Typography>{item.weather.current.temperature}°C</Typography>
                        <img
                          src={item.weather.current.weather_icons[0]}
                          alt={item.weather.current.weather_descriptions[0]}
                          style={{ width: '40px', verticalAlign: 'middle' }}
                        />
                        {item.weather.current.weather_descriptions[0]}
                      </TableCell>
                      <TableCell>{item.searched_at}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Report;
