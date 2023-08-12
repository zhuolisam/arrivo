const express = require('express');
const postController = require('../controllers/post.controller');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const postValidation = require('../validations/post.validation');
const roleType = require('../config/roles');

const router = express.Router();

// get all categories and create new category
router
  .route('/')
  .get(auth([]), postController.getPosts)
  .post(
    auth([roleType.ADMIN]),
    validate(postValidation.createPost),
    postController.createPost
  );

// get, update, delete only one category
router
  .route('/:postId')
  .get(auth([]), validate(postValidation.getPost), postController.getPost)
  .patch(
    auth([roleType.ADMIN]),
    validate(postValidation.updatePost),
    postController.updatePost
  )
  .delete(
    auth([roleType.ADMIN]),
    validate(postValidation.deletePost),
    postController.deletePost
  );

module.exports = router;
