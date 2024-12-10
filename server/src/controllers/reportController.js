const SearchHistory = require('../models/SearchHistory');
const User = require('../models/User');

exports.getReport = async (req, res) => {
  try {
    const searches = await SearchHistory.findAll({
      include: [
        { model: User, attributes: ['username'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    const report = searches.map(s => ({
      username: s.User.username,
      city: s.city,
      weather: JSON.parse(s.weather_data),
      searched_at: s.createdAt
    }));

    res.json(report);
  } catch (err) {
    console.error('Error fetching report:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
