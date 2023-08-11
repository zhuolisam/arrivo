const UserModel = require('../src/models/user.model');
const PostModel = require('../src/models/post.model');
const CategoryModel = require('../src/models/category.model');

// Define seed data
const seedData = async (db) => {
  // Seed users
  await UserModel.createUser(
    {
      Username: 'admin',
      Password: 'adminpassword',
      Email: 'admin@example.com',
      FullName: 'Admin User',
      Membership: 'Admin',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    },
    db
  );

  await UserModel.createUser(
    {
      Username: 'normaluser',
      Password: 'normaluser',
      Email: 'normal@example.com',
      FullName: 'Normal User',
      Membership: 'Normal',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    },
    db
  );

  await UserModel.createUser(
    {
      Username: 'premiumuser',
      Password: 'premiumpassword',
      Email: 'premium@example.com',
      FullName: 'Premium User',
      Membership: 'Premium',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    },
    db
  );

  await CategoryModel.createCategory(
    {
      Name: 'Biology',
      Description: 'Biology Post',
      Activated: true,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    },
    db
  );

  await CategoryModel.createCategory(
    {
      Name: 'Chemistry',
      Description: 'Chemistry Post',
      Activated: true,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    },
    db
  );

  // Seed posts
  await PostModel.createPost(
    {
      Title: 'Normal Post',
      Body: 'This is a normal post.',
      CategoryID: 1,
      Status: 'Published',
      Label: 'Normal',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    },
    db
  );

  await PostModel.createPost(
    {
      Title: 'Premium Post',
      Body: 'This is a premium post.',
      CategoryID: 2,
      Status: 'Published',
      Label: 'Premium',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    },
    db
  );
};

const db = require('../src/db/database');

try {
  seedData(db).finally(() => {
    console.log('Seed data inserted successfully');
  });
} catch (error) {
  console.log(error);
}
