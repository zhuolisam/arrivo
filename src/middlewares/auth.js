const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { decodeToken } = require('../models/token.model');

const auth = (requiredMemberships) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    if (!req.headers.authorization) {
      reject(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
    }
    const token = req.headers.authorization.split('Bearer ')[1];

    let decoded;
    // Verify the token and decode the payload
    try {
      decoded = decodeToken(token);
    } catch (err) {
      reject(new ApiError(httpStatus.UNAUTHORIZED, err.message));
    }

    // Check if the decoded payload contains a membership field
    if (!decoded.membership) {
      reject(new ApiError(httpStatus.UNAUTHORIZED, 'Unoauthorized'));
    }
    if (requiredMemberships.length) {
      // Check if the decoded membership matches any of the required memberships
      if (!requiredMemberships.includes(decoded.membership)) {
        reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
      }
    }
    req.user = decoded;
    resolve(decoded);
  })
    .then(() => {
      next();
    })
    .catch((err) => next(err));
};

module.exports = auth;
