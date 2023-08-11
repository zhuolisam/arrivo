const db = require('../db/database');

const createCategory = async (categoryData) => {
  const query = `
            INSERT INTO "Category" (Name, Description, Activated, CreatedAt, UpdatedAt)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

  const values = [
    categoryData.Name,
    categoryData.Description,
    categoryData.Activated,
    categoryData.CreatedAt,
    categoryData.UpdatedAt,
  ];

  const result = await db.one(query, values);
  return result;
};

module.exports = {
  createCategory,
};
