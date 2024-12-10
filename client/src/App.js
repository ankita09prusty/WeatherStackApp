
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WeatherSearch from './pages/WeatherSearch';
import Report from './pages/Report';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/weather" element={<WeatherSearch />} />
        <Route path="/report" element={<Report />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

