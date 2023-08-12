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

const verifyToken = (token) => {
  // check if token is valid and not expired
  const decoded = decodeToken(token);
  const now = day();
  const expiresAt = day.unix(decoded.exp);
  if (now.isAfter(expiresAt)) {
    return {};
  }
  return decoded;
};

module.exports = {
  generateAccessToken,
  verifyToken,
};
