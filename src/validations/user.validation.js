const Joi = require('joi');
const { password } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    username: Joi.string().required(),
    name: Joi.string().required(),
    membership: Joi.string().valid('Normal'),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required(),
  }),
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().custom(password),
    name: Joi.string(),
    membership: Joi.string().valid('Normal', 'Premium'),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
