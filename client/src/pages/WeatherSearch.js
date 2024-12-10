import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Grid, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function WeatherSearch() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);

      const response = await fetch(`http://localhost:5000/weather?city=${city}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeather(data.weather); 
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <Grid container style={{ minHeight: '100vh' }} alignItems="center" justifyContent="center">
      <Grid item xs={10} sm={6} md={4}>
        <Paper style={{ padding: '20px' }} elevation={3}>
          <Typography variant="h4" gutterBottom>
            Weather Search
          </Typography>
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSearch}
            style={{ marginTop: '20px' }}
          >
            Search
          </Button>
          {error && (
            <Alert severity="error" style={{ marginTop: '20px' }}>
              {error}
            </Alert>
          )}
          {weather && (
            <Paper style={{ marginTop: '20px', padding: '20px' }} elevation={3}>
              <Typography variant="h5" gutterBottom>
                Weather Data for {weather.location.name}, {weather.location.country}
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Parameter</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Location Data */}
                    <TableRow>
                      <TableCell>City</TableCell>
                      <TableCell>{weather.location.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Region</TableCell>
                      <TableCell>{weather.location.region}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Country</TableCell>
                      <TableCell>{weather.location.country}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Local Time</TableCell>
                      <TableCell>{weather.location.localtime}</TableCell>
                    </TableRow>

                    {/* Current Weather Data */}
                    <TableRow>
                      <TableCell>Temperature</TableCell>
                      <TableCell>{weather.current.temperature}°C</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Weather</TableCell>
                      <TableCell>
                        <img
                          src={weather.current.weather_icons[0]}
                          alt={weather.current.weather_descriptions[0]}
                          style={{ width: '50px', verticalAlign: 'middle', marginRight: '10px' }}
                        />
                        {weather.current.weather_descriptions[0]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Wind</TableCell>
                      <TableCell>
                        {weather.current.wind_speed} km/h, {weather.current.wind_dir}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Humidity</TableCell>
                      <TableCell>{weather.current.humidity}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Pressure</TableCell>
                      <TableCell>{weather.current.pressure} mb</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>UV Index</TableCell>
                      <TableCell>{weather.current.uv_index}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Visibility</TableCell>
                      <TableCell>{weather.current.visibility} km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Is Day</TableCell>
                      <TableCell>{weather.current.is_day === 'yes' ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default WeatherSearch;
