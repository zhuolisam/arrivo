const express = require('express');
const categoryController = require('../controllers/category.controller');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const categoryValidation = require('../validations/category.validation');
const roleType = require('../config/roles');

const router = express.Router();

// get all categories and create new category
router
  .route('/')
  .get(auth([roleType.ADMIN]), categoryController.getCategories)
  .post(
    auth([roleType.ADMIN]),
    validate(categoryValidation.createCategory),
    categoryController.createCategory
  );

// get, update, delete only one category
router
  .route('/:categoryId')
  .get(
    auth([roleType.ADMIN]),
    validate(categoryValidation.getCategory),
    categoryController.getCategory
  )
  .patch(
    auth([roleType.ADMIN]),
    validate(categoryValidation.updateCategory),
    categoryController.updateCategory
  )
  .delete(
    auth([roleType.ADMIN]),
    validate(categoryValidation.deleteCategory),
    categoryController.deleteCategory
  );

module.exports = router;
