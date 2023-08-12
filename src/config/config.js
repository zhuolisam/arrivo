const dotenv = require('dotenv');
const path = require('path');
const { Buffer } = require('buffer');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const dbConfig = {
  url: process.env.DATABASE_URL,
};

// write the necessary config for jwt and bcrypt
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  expiresInHours: parseInt(process.env.JWT_EXPIRES_IN_HOURS, 10),
};

const bcryptConfig = {
  saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10),
};

const billplzConfig = {
  collectionId: process.env.BILLPLZ_COLLECTION_ID,
  secretKey: process.env.BILLPLZ_SECRET_KEY,
  secretKeyBase64: Buffer.from(process.env.BILLPLZ_SECRET_KEY).toString(
    'base64'
  ),
  apiURL: process.env.BILLPLZ_API_URL,
  XSignatureKey: process.env.BILLPLZ_X_SIGNATURE_KEY,
};

const localURI = process.env.LOCAL_URL;

const premiumPrice = parseFloat(process.env.PREMIUM_PRICE);

const dummyEmail = process.env.DUMMY_EMAIL;

module.exports = {
  dbConfig,
  jwtConfig,
  bcryptConfig,
  billplzConfig,
  localURI,
  premiumPrice,
  dummyEmail,
};
