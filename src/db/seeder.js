const bcrypt = require('bcryptjs');
const createUserModel = require('../models/user.model');
const createPostModel = require('../models/post.model');

// Function to hash a password using bcrypt
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// Define seed data
const seedData = async (db) => {
  try {
    // Seed users
    const adminPassword = await hashPassword('adminpassword');
    await createUserModel.createUser(
      {
        Username: 'admin',
        Password: adminPassword,
        Email: 'admin@example.com',
        FullName: 'Admin User',
        Membership: 'Admin',
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      },
      db
    );

    const normalPassword = await hashPassword('normalpassword');
    await createUserModel.createUser(
      {
        Username: 'normaluser',
        Password: normalPassword,
        Email: 'normal@example.com',
        FullName: 'Normal User',
        Membership: 'Normal',
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      },
      db
    );

    const premiumPassword = await hashPassword('premiumpassword');
    await createUserModel.createUser(
      {
        Username: 'premiumuser',
        Password: premiumPassword,
        Email: 'premium@example.com',
        FullName: 'Premium User',
        Membership: 'Premium',
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      },
      db
    );

    // Seed posts
    await createPostModel.createPost(
      {
        Title: 'Normal Post',
        Body: 'This is a normal post.',
        CategoryID: 1, // Specify the appropriate CategoryID
        Status: 'Published',
        Label: 'Normal',
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      },
      db
    );

    await createPostModel.createPost(
      {
        Title: 'Premium Post',
        Body: 'This is a premium post.',
        CategoryID: 2, // Specify the appropriate CategoryID
        Status: 'Published',
        Label: 'Premium',
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      },
      db
    );

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

// Import the db connection from index.js
const db = require('./index');

// Call the seedData function with the existing db connection
seedData(db).finally(() => {
  // Close the database connection
  db.$pool.end();
});
