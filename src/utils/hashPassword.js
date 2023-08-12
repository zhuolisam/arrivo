const bcrypt = require('bcryptjs');
const { bcryptConfig } = require('../config/config');

const bcryptSalt = bcrypt.genSaltSync(bcryptConfig.saltRounds);

const generateHashedPasword = async (password) => {
  const hash = await bcrypt.hash(password, bcryptSalt);
  return hash;
};

const verifyPassword = async (plainPassword, hashedPassword) => {
  const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isPasswordMatch;
};

module.exports = {
  generateHashedPasword,
  verifyPassword,
};
