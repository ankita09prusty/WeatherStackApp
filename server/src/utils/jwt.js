const jwt = require('jsonwebtoken');

module.exports = {
  signToken: (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }),
  verifyToken: (token) => jwt.verify(token, process.env.JWT_SECRET)
};
