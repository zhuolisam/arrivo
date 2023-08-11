// Function to create a new user
const createUser = async (userData, dbc) => {
  const query = `
      INSERT INTO "User" (Username, Password, Email, FullName, Membership, CreatedAt, UpdatedAt)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

  const values = [
    userData.Username,
    userData.Password,
    userData.Email,
    userData.FullName,
    userData.Membership,
    userData.CreatedAt,
    userData.UpdatedAt,
  ];

  const result = await dbc.one(query, values);
  return result;
};

// Add more user-related functions as needed...

module.exports = {
  createUser,
  // Add other functions here...
};
