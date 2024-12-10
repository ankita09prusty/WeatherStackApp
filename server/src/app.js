require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./models/index');
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');
const reportRoutes = require('./routes/report');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/weather', weatherRoutes);
app.use('/report', reportRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log('Server running on port ' + (process.env.PORT || 5000));
  });
});