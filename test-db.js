import db from "./db.js";
import express from 'express'
const app = express()
try {
  const res = await db.query("SELECT * FROM capital");
  console.log("Connected! Time is:", res.rows[0]);
  // process.exit(0);
} catch (err) {
  console.error("DB error:", err);
  // process.exit(1);
}

app.listen(3001, () => {
  console.log(`listening at port 3001`);
})