const Joi = require('joi');

const createPayment = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

module.exports = {
  createPayment,
};
