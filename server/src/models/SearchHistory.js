const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const SearchHistory = sequelize.define('SearchHistory', {
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weather_data: {
    type: DataTypes.TEXT, 
    allowNull: false
  }
});

SearchHistory.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(SearchHistory, { foreignKey: 'user_id' });

module.exports = SearchHistory;
