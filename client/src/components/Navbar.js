import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();


  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    
    localStorage.removeItem('token');

    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Weather App
        </Typography>
        {isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/weather">
              Weather
            </Button>
            <Button color="inherit" component={Link} to="/report">
              Report
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
