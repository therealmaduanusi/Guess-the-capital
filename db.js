import env from "dotenv";
import pg from "pg";

env.config();
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export default db;
