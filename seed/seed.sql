-- Create tables
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

CREATE TABLE IF NOT EXISTS "Category" (
  CategoryID SERIAL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Description TEXT,
  Activated BOOLEAN NOT NULL,
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

CREATE TABLE IF NOT EXISTS "Payment" (
  PaymentID SERIAL PRIMARY KEY,
  BillID VARCHAR(255),
  BillplzTransactionID VARCHAR(255),
  UserID INTEGER REFERENCES "User" (UserID),
  Amount DECIMAL(10, 2) NOT NULL,
  PaymentMethod VARCHAR(255),
  Status VARCHAR(20) NOT NULL,
  CreatedAt TIMESTAMP NOT NULL,
  UpdatedAt TIMESTAMP NOT NULL
);

-- Insert seed data
INSERT INTO "User" (Username, Password, Email, FullName, Membership, CreatedAt, UpdatedAt)
VALUES
  ('admin', '$2a$10$1.zZ1fz3pd26WYJ0upQa.eYE80eEiASQBLjvOphMN0zln7hKNJyme', 'admin@example.com', 'Admin User', 'Admin', NOW(), NOW()),
  ('normaluser', '$2a$10$1.zZ1fz3pd26WYJ0upQa.eIA/61wRlqClnihqiw54gWQu7vrcZG9q', 'normal@example.com', 'Normal User', 'Normal', NOW(), NOW()),
  ('premiumuser', '$2a$10$1.zZ1fz3pd26WYJ0upQa.ewrk8g/PU.2C.FsUZQ7TE6yRcA19mWUG', 'premium@example.com', 'Premium User', 'Premium', NOW(), NOW());

INSERT INTO "Category" (Name, Description, Activated, CreatedAt, UpdatedAt)
VALUES
  ('Biology', 'Biology Post', TRUE, NOW(), NOW()),
  ('Chemistry', 'Chemistry Post', TRUE, NOW(), NOW());

INSERT INTO "Post" (Title, Body, CategoryID, Status, Label, CreatedAt, UpdatedAt)
VALUES
  ('Normal Post', 'This is a normal post.', 1, 'Published', 'Normal', NOW(), NOW()),
  ('Premium Post', 'This is a premium post.', 2, 'Published', 'Premium', NOW(), NOW());
