const Joi = require('joi');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    categoryname: Joi.string().required(),
    status: Joi.string()
      .valid('Draft', 'Published', 'Pending Review')
      .required(),
    label: Joi.string().valid('Normal', 'Premium').required(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    postId: Joi.string().required(),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    categoryname: Joi.string().required(),
    status: Joi.string().valid('Draft', 'Published', 'Pending Review'),
    label: Joi.string().valid('Normal', 'Premium'),
  }),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().required(),
  }),
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
};
