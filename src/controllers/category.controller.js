const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const categoryModel = require('../models/category.model');

// Controller to create a new category
const createCategory = catchAsync(async (req, res) => {
  const category = await categoryModel.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

// Controller to get all categories
const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryModel.getCategories();
  res.status(httpStatus.OK).send(categories);
});

// Controller to get a category by ID
const getCategory = catchAsync(async (req, res) => {
  const category = await categoryModel.getCategoryById(req.params.categoryId);
  if (!category) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Category not found' });
    return;
  }
  res.status(httpStatus.OK).send(category);
});

// Controller to update a category by ID
const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryModel.updateCategoryById(
    req.params.categoryId,
    req.body
  );
  res.status(httpStatus.OK).send(category);
});

// Controller to delete a category by ID
const deleteCategory = catchAsync(async (req, res) => {
  await categoryModel.deleteCategoryById(req.params.categoryId);
  res.status(httpStatus.NO_CONTENT).send({ message: 'Category deleted' });
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
