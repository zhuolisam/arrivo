const UserModel = require('../src/models/user.model');
const PostModel = require('../src/models/post.model');
const CategoryModel = require('../src/models/category.model');

// Define seed data
const seedData = async (db) => {
  // Seed users
  await UserModel.createUser(
    {
      username: 'admin',
      password: 'adminpassword',
      email: 'admin@example.com',
      fullname: 'Admin User',
      membership: 'Admin',
      createdat: new Date(),
      updatedat: new Date(),
    },
    db
  );

  await UserModel.createUser(
    {
      username: 'normaluser',
      password: 'normalpassword',
      email: 'normal@example.com',
      fullname: 'Normal User',
      membership: 'Normal',
      createdat: new Date(),
      updatedat: new Date(),
    },
    db
  );

  await UserModel.createUser(
    {
      username: 'premiumuser',
      password: 'premiumpassword',
      email: 'premium@example.com',
      fullname: 'Premium User',
      membership: 'Premium',
      createdat: new Date(),
      updatedat: new Date(),
    },
    db
  );

  await CategoryModel.createCategory(
    {
      name: 'Biology',
      description: 'Biology Post',
      activated: true,
      createdat: new Date(),
      updatedat: new Date(),
    },
    db
  );

  await CategoryModel.createCategory(
    {
      name: 'Chemistry',
      description: 'Chemistry Post',
      activated: true,
      createdat: new Date(),
      updatedat: new Date(),
    },
    db
  );

  // Seed posts
  await PostModel.createPost(
    {
      title: 'Normal Post',
      body: 'This is a normal post.',
      categoryid: 1,
      status: 'Published',
      label: 'Normal',
      createdat: new Date(),
      updatedat: new Date(),
    },
    db
  );

  await PostModel.createPost(
    {
      title: 'Premium Post',
      body: 'This is a premium post.',
      categoryid: 2,
      status: 'Published',
      label: 'Premium',
      createdat: new Date(),
      updatedat: new Date(),
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
