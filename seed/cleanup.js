// Define table dropping statements
const dropTables = async (db) => {
  await db.none(
    `
    DROP TABLE IF EXISTS "Payment";
    DROP TABLE IF EXISTS "Post";
    DROP TABLE IF EXISTS "Category";
    DROP TABLE IF EXISTS "User";
      `,
    []
  );
};

const db = require('../src/db/database');

try {
  dropTables(db).finally(() => {
    console.log('Tables cleaned');
  });
} catch (error) {
  console.log(error);
}
