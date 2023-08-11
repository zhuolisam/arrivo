const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const dbConfig = {
  url: process.env.DATABASE_URL,
};

// write the necessary config for jwt and bcrypt
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  expiresInHours: process.env.JWT_EXPIRES_IN_HOURS,
};

const bcryptConfig = {
  saltRounds: process.env.BCRYPT_SALT_ROUNDS,
};

module.exports = {
  dbConfig,
  jwtConfig,
  bcryptConfig,
};
