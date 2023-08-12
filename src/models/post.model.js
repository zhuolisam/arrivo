const db = require('../db/database');

const createPost = async (postData) => {
  const query = `
        INSERT INTO "Post" (Title, Body, CategoryID, Status, Label, CreatedAt, UpdatedAt)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `;
  const values = [
    postData.title,
    postData.body,
    postData.categoryid,
    postData.status,
    postData.label,
    postData.createdat,
    postData.updatedat,
  ];
  const result = await db.one(query, values);
  return result;
};

module.exports = {
  createPost,
};
