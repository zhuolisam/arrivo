const Joi = require('joi');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    activated: Joi.boolean().required(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    activated: Joi.boolean().required(),
  }),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
