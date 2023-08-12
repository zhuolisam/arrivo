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
  secret = jwtConfig.secret,
  type = tokenTypes.ACCESS
) => {
  const now = day();
  const payload = {
    sub: user.userid,
    iat: now.unix(),
    membership: user.membership,
    type,
  };

  const token = jwt.sign(payload, secret, {
    expiresIn,
  });
  return token;
};

const decodeToken = (token) => {
  const decoded = jwt.verify(token, jwtConfig.secret);
  return decoded;
};

module.exports = {
  generateAccessToken,
  decodeToken,
};
