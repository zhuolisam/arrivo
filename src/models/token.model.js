const jwt = require('jsonwebtoken');
const day = require('dayjs');
const duration = require('dayjs/plugin/duration');

const { jwtConfig } = require('../config/config');
const tokenTypes = require('../config/tokens');

day.extend(duration);

// Function to generate a JWT token
const generateAccessToken = (
  user,
  expiresIn = jwtConfig.expiresIn,
  expiresInHours = jwtConfig.expiresInHours,
  secret = jwtConfig.secret,
  type = tokenTypes.ACCESS
) => {
  const now = day();
  const expiration = now.add(day.duration(expiresInHours, 'hours'));
  const payload = {
    sub: user.UserId,
    iat: day().unix(),
    exp: expiration.unix(),
    role: user.Membership,
    type,
  };

  const token = jwt.sign(payload, secret, {
    expiresIn,
  });
  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, jwtConfig.secret);
  return decoded;
};

module.exports = {
  generateAccessToken,
  verifyToken,
};
