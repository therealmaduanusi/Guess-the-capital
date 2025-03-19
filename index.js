import express from "express";
import bodyParser from "body-parser";
// import pg from "pg";
import { fileURLToPath } from "url";
import { dirname } from "path";
import db from "./db.js"
// import env from "dotenv";

// env.config();

// const db = new pg.Client({
//   user: process.env.USER_NAME,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.PORT,
// });

// db.connect()
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// quiz array
let quiz = [];
db.query("SELECT * FROM capital", (err, res) => {
    if (err) {
        console.error("Error executing query", err.stack);
    } else {
        quiz = res.rows;
    }
    db.end();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Set EJS as the view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");


let currentQuestion;
let totalCorrect = 0;

// route
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
  });
});

app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;

  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    totalScore: totalCorrect,
    wasCorrect: isCorrect,
  });
});

// random question
function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
