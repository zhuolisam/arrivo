// Function to create a new user
const db = require('../db/database');
const { generateHashedPasword } = require('../utils/hashPassword');

const createUser = async (userData) => {
  const query = `
        INSERT INTO "User" (Username, Password, Email, FullName, Membership, CreatedAt, UpdatedAt)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;

  const values = [
    userData.username,
    await generateHashedPasword(userData.password),
    userData.email,
    userData.fullname,
    userData.membership || 'Normal',
    new Date(),
    new Date(),
  ];

  const user = await db.one(query, values);
  const result = {
    userId: user.userid,
    username: user.username,
    email: user.email,
    fullname: user.fullname,
    membership: user.membership,
  };
  return result;
};

const getUsers = async () => {
  const query = `
    SELECT "username", "email", "fullname", "membership", "createdat", "updatedat"
    FROM "User";
  `;
  const result = await db.any(query);
  return result;
};

const getUserById = async (userId) => {
  const query = `
    SELECT 
    FROM "User" WHERE userid = $1;
      `;
  const result = await db.oneOrNone(query, [userId]);
  return result;
};

const getUserByEmail = async (email) => {
  const query = `
        SELECT *
        FROM "User" WHERE email = $1;
      `;
  const result = await db.oneOrNone(query, [email]);
  return result;
};

const updateUserById = async (userId, userData) => {
  const query = `
        UPDATE "User"
        SET Username = $1,
            Password = $2,
            Email = $3,
            FullName = $4,
            Membership = $5,
            UpdatedAt = $6
        WHERE userid = $7
        RETURNING *;
      `;
  const values = [
    userData.username,
    await generateHashedPasword(userData.password),
    userData.email,
    userData.fullname,
    userData.membership,
    new Date(),
    userId,
  ];
  const result = await db.one(query, values);
  return result;
};

const deleteUserById = async (userId) => {
  const query = `
        DELETE FROM "User" WHERE userid = $1;
      `;
  await db.none(query, [userId]);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
