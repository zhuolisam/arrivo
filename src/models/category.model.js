const db = require('../db/database');

const createCategory = async (categoryData) => {
  const query = `
            INSERT INTO "Category" (Name, Description, Activated, CreatedAt, UpdatedAt)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

  const values = [
    categoryData.name,
    categoryData.description,
    categoryData.activated,
    new Date(),
    new Date(),
  ];

  const result = await db.one(query, values);
  return result;
};

// Function to get all categories
const getCategories = async () => {
  const query = `
    SELECT * FROM "Category";
  `;
  const categories = await db.any(query);
  return categories;
};

// Function to get a category by ID
const getCategoryById = async (categoryId) => {
  const query = `
    SELECT * FROM "Category" WHERE categoryid = $1;
  `;
  const category = await db.oneOrNone(query, [categoryId]);
  return category;
};

const getCategoryByName = async (categoryName) => {
  const query = `
    SELECT * FROM "Category" WHERE name = $1;
  `;
  const category = await db.oneOrNone(query, [categoryName]);
  return category;
};

// Function to update a category by ID
const updateCategoryById = async (categoryId, categoryData) => {
  const query = `
    UPDATE "Category"
    SET name = $1,
        description = $2,
        activated = $3,
        updatedat = $4
    WHERE categoryid = $5
    RETURNING *;
  `;

  const values = [
    categoryData.name,
    categoryData.description,
    categoryData.activated,
    new Date(),
    categoryId,
  ];

  const category = await db.one(query, values);
  return category;
};

// Function to delete a category by ID
const deleteCategoryById = async (categoryId) => {
  const query = `
    DELETE FROM "Category" WHERE categoryid = $1;
  `;
  await db.none(query, [categoryId]);
};

// Function to delete a category by Name
const deleteCategoryByName = async (categoryId) => {
  const query = `
    DELETE FROM "Category" WHERE name = $1;
  `;
  await db.none(query, [categoryId]);
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  getCategoryByName,
  updateCategoryById,
  deleteCategoryById,
  deleteCategoryByName,
};
