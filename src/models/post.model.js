const db = require('../db/database');

const createPost = async (postData) => {
  const query = `
        INSERT INTO "Post" (title, body, categoryid, status, label, createdat, updatedat)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `;
  const values = [
    postData.title,
    postData.body,
    postData.categoryid,
    postData.status,
    postData.label,
    new Date(),
    new Date(),
  ];
  const result = await db.one(query, values);
  return result;
};

// Function to get all posts
const getAllPosts = async () => {
  const query = `
    SELECT * FROM "Post" ;
  `;

  const posts = await db.manyOrNone(query);
  return posts;
};

// Function to get all posts
const getAllPostsPublished = async () => {
  const query = `
    SELECT * FROM "Post" WHERE status = 'Published';
  `;

  const posts = await db.any(query);
  return posts;
};

// Function to get normal posts (filtered by label)
const getNormalPostsPublished = async () => {
  const query = `
    SELECT * FROM "Post" WHERE label = 'Normal' AND status = 'Published';
  `;

  const normalPosts = await db.any(query);
  return normalPosts;
};

// Function to get a post by ID
const getPostById = async (postId) => {
  const query = `
    SELECT * FROM "Post" WHERE PostID = $1;
  `;

  const post = await db.oneOrNone(query, [postId]);
  return post;
};

// Function to update a post by ID
const updatePostById = async (postId, postData) => {
  const query = `
    UPDATE "Post"
    SET title = $1,
        body = $2,
        categoryid = $3,
        status = $4,
        label = $5,
        updatedat = $6
    WHERE postid = $7
    RETURNING *;
  `;

  const values = [
    postData.title,
    postData.body,
    postData.categoryid,
    postData.status,
    postData.label,
    new Date(),
    postId,
  ];

  const post = await db.one(query, values);
  return post;
};

// Function to delete a post by ID
const deletePostById = async (postId) => {
  const query = `
    DELETE FROM "Post" WHERE postid = $1;
  `;

  await db.none(query, [postId]);
};

module.exports = {
  createPost,
  getAllPosts,
  getAllPostsPublished,
  getNormalPostsPublished,
  getPostById,
  updatePostById,
  deletePostById,
};
