const {
  generateHashedPasword,
  verifyPassword,
} = require('./src/utils/hashPassword');

const { decodeToken } = require('./src/models/token.model');

const decode = decodeToken('iusdhf');
console.log(decode);
