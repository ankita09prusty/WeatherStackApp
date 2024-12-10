const axios = require('axios');
const SearchHistory = require('../models/SearchHistory');
const User = require('../models/User');

exports.getWeather = async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const response = await axios.get('http://api.weatherstack.com/current', {
      params: {
        access_key: process.env.WEATHERSTACK_KEY,
        query: city
      }
    });

    const weatherData = response.data;
    
    await SearchHistory.create({ 
      user_id: req.user.id, 
      city, 
      weather_data: JSON.stringify(weatherData) 
    });

    res.json({ city, weather: weatherData });
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
};
