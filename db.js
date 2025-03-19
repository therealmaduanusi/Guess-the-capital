import env from "dotenv";
import pg from "pg";

env.config();
const db = new pg.Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "world",
//   password: "maduanusi",
//   port: 5432,
  connectionString: process.env.DATABASE_URL,
});

export default db;
