const db = require('./index');

// Define table creation statements
const createTables = async () => {
  await db.none(`
      CREATE TABLE IF NOT EXISTS "User" (
        UserID SERIAL PRIMARY KEY,
        Username VARCHAR(255) NOT NULL,
        Password VARCHAR(255) NOT NULL,
        Email VARCHAR(255) NOT NULL,
        FullName VARCHAR(255),
        Membership VARCHAR(20) NOT NULL,
        CreatedAt TIMESTAMP NOT NULL,
        UpdatedAt TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "Post" (
        PostID SERIAL PRIMARY KEY,
        Title VARCHAR(255) NOT NULL,
        Body TEXT,
        CategoryID INTEGER REFERENCES "Category" (CategoryID),
        Status VARCHAR(20) NOT NULL,
        Label VARCHAR(20) NOT NULL,
        CreatedAt TIMESTAMP NOT NULL,
        UpdatedAt TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "Category" (
        CategoryID SERIAL PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Description TEXT,
        Activated BOOLEAN NOT NULL,
        CreatedAt TIMESTAMP NOT NULL,
        UpdatedAt TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "Payment" (
        PaymentID SERIAL PRIMARY KEY,
        Amount DECIMAL(10, 2) NOT NULL,
        PaymentMethod VARCHAR(255),
        Status VARCHAR(20) NOT NULL,
        CreatedAt TIMESTAMP NOT NULL,
        UpdatedAt TIMESTAMP NOT NULL
      );
    `);

  console.log('Tables created (if not exist)');
};

module.exports = createTables;
