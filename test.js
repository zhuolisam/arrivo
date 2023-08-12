const {
  generateHashedPasword,
  verifyPassword,
} = require('./src/utils/hashPassword');

const { verifyToken } = require('./src/models/token.model');

const decode = verifyToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5MTgyNDYwNCwibWVtYmVyc2hpcCI6IkFkbWluIiwiZXhwIjoxNjkxODM1NDA0fQ.WqFEACSWgP1_5v39_8LmzQ5RCc_PZamZ3XFS7UvDMI8'
);
console.log(decode);
