const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const userModel = require('../models/user.model');
const tokenModel = require('../models/token.model');

const register = catchAsync(async (req, res) => {
  const user = await userModel.createUser(req.body);
  res.status(httpStatus.CREATED).send({ user });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.getUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.Password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  const tokens = await tokenModel.generateAccessToken(user);
  res.send({ user, tokens });
});

module.exports = {
  register,
  login,
};
